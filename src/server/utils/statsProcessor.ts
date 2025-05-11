import { prisma } from '../../lib/prisma.js';
import { formatAustralianTime } from './timeUtils.js';
import { broadcastUpdate } from './clientManager.js';
import { axiosWithRetry, API_CONFIG } from './apiClient.js';
import type { BlockchairStatsData, StatsChanges, StatsUpdate } from '../types/stats.js';

// Helper function to compare stats and identify changes
function compareStats(oldData: any, newData: any): StatsChanges {
  const changes: StatsChanges = {};
  
  if (!oldData || !newData) {
    return changes;
  }

  // Compare each field
  for (const key in newData) {
    if (JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) {
      changes[key] = true;
    }
  }

  return changes;
}

export async function fetchAndStoreBlockchairStats() {
  try {
    // Get previous stats
    const [previousBitcoinStats, previousEthereumStats] = await Promise.all([
      prisma.blockchairStats.findFirst({
        where: { network: 'bitcoin' },
        orderBy: { timestamp: 'desc' }
      }),
      prisma.blockchairStats.findFirst({
        where: { network: 'ethereum' },
        orderBy: { timestamp: 'desc' }
      })
    ]);

    const currentTime = new Date();

    // Fetch Bitcoin stats
    const bitcoinResponse = await axiosWithRetry(
      'https://api.blockchair.com/bitcoin/stats',
      API_CONFIG
    );
    const bitcoinStats = bitcoinResponse.data;
    
    await prisma.blockchairStats.upsert({
      where: {
        timestamp_network: {
          timestamp: formatAustralianTime(currentTime),
          network: 'bitcoin'
        }
      },
      update: {
        data: bitcoinStats as any
      },
      create: {
        timestamp: formatAustralianTime(currentTime),
        network: 'bitcoin',
        data: bitcoinStats as any
      }
    });

    // Fetch Ethereum stats
    const ethereumResponse = await axiosWithRetry(
      'https://api.blockchair.com/ethereum/stats',
      API_CONFIG
    );
    const ethereumStats = ethereumResponse.data;
    
    await prisma.blockchairStats.upsert({
      where: {
        timestamp_network: {
          timestamp: formatAustralianTime(currentTime),
          network: 'ethereum'
        }
      },
      update: {
        data: ethereumStats as any
      },
      create: {
        timestamp: formatAustralianTime(currentTime),
        network: 'ethereum',
        data: ethereumStats as any
      }
    });

    // Extract the actual stats data
    const prevBitcoinData = previousBitcoinStats?.data as any;
    const prevEthereumData = previousEthereumStats?.data as any;
    const newBitcoinData = bitcoinStats.data;
    const newEthereumData = ethereumStats.data;

    // Compare and mark changed fields
    const bitcoinChanges = compareStats(
      prevBitcoinData?.data, 
      newBitcoinData
    );
    const ethereumChanges = compareStats(
      prevEthereumData?.data, 
      newEthereumData
    );

    // Broadcast update to connected clients with change information
    const updateData: StatsUpdate = {
      type: 'stats_update',
      bitcoin: { 
        data: newBitcoinData,
        changes: bitcoinChanges
      },
      ethereum: { 
        data: newEthereumData,
        changes: ethereumChanges
      },
      timestamp: formatAustralianTime(currentTime)
    };

    broadcastUpdate(updateData);
  } catch (error) {
    console.error('Error fetching Blockchair stats:', error);
  }
}

// Initialize stats fetching
fetchAndStoreBlockchairStats();

// Update interval to 60 seconds for stats
setInterval(fetchAndStoreBlockchairStats, 60 * 1000); 