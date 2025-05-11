import { formatInTimeZone } from 'date-fns-tz';

export const TIMEZONE = 'Australia/Sydney';

// Helper function to convert UTC to Australian time
export function toAustralianTime(date: string | Date): Date {
  const inputDate = new Date(date);
  // Convert to Australian timezone
  const auDate = formatInTimeZone(inputDate, TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  return new Date(auDate);
}

// Helper function to format time to Australian timezone string
export function formatAustralianTime(date: Date | string): string {
  const inputDate = new Date(date);
  return formatInTimeZone(inputDate, TIMEZONE, "d MMM yyyy, h:mm a");
}

// Helper function for delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); 