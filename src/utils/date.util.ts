// import { BadRequestException } from '@nestjs/common';

// Helper function to parse MM/DD/YYYY into a valid Date
export function parseDate(dateStr) {
  const [month, day, year] = dateStr.split('/'); // Split by '/'
  return new Date(`${year}-${month}-${day}T00:00:00.000Z`); // Convert to YYYY-MM-DD
}
