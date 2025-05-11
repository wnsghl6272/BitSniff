import axios, { AxiosResponse } from 'axios';
import type { AxiosError } from '../types/stats.js';

// 재시도 로직을 위한 유틸리티 함수
export const axiosWithRetry = async <T = any>(
  url: string, 
  config: any, 
  retries = 3, 
  delay = 2000
): Promise<AxiosResponse<T>> => {
  try {
    return await axios.get(url, {
      ...config,
      timeout: 30000,
    });
  } catch (error: unknown) {
    if (retries === 0) throw error;
    
    const axiosError = error as AxiosError;
    if (axiosError.code === 'ECONNABORTED' || axiosError.response?.status === 402) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return axiosWithRetry(url, config, retries - 1, delay);
    }
    
    throw error;
  }
};

// API 호출 설정
export const API_CONFIG = {
  headers: {
    'Accept': 'application/json'
  },
  validateStatus: (status: number) => status === 200 || status === 402, // 402 에러도 허용
  timeout: 30000
}; 