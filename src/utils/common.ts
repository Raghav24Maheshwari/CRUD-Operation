import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function passwordEncryption(
  password: string,
  salt: number = 8,
): Promise<string> {
  return await bcrypt.hash(password, salt);
}

export async function passwordCompare(
  password: string,
  hashPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
}

export function generateRandomSlug(str = '') {
  const timeDate = getCurrentDateTime();
  return str + timeDate.time + '' + Math.floor(1000 + Math.random() * 9000);
}

export function getCurrentDateTime() {
  try {
    const date = new Date();
    return {
      date: date,
      time: date.getTime(),
    };
  } catch (e) {
    throw new BadRequestException('Unable to find date time');
  }
}

export function generateRandomOTP(digits: number = 4): string {
  if (digits <= 0) {
    throw new Error('Number of digits must be greater than 0');
  }
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  const otp = '123456'; // Math.floor(Math.random() * (max - min + 1)) + min;
  return otp.toString();
}

export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export function getPlainObject(instance) {
  if (Array.isArray(instance)) {
    return instance.map((item) => item.get({ plain: true }));
  }
  return instance.get({ plain: true });
}

export function isValidEmail(email: string): boolean {
  const emailRegex =
    /^[^\s@]+@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
  //^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return true;
  }

  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    return lowerValue === 'true' || lowerValue === 'false';
  }

  return false;
}

export function parseBoolean(value: string | boolean): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'true') {
      return true;
    } else if (lowerValue === 'false') {
      return false;
    }
  }

  throw new Error(
    "Invalid input: value must be a string ('true' or 'false') or a boolean.",
  );
}

export function isValidMobileNumber(mobileNumber: string): boolean {
  const mobileNumberPattern = /^[6-9]\d{9}$/;
  return mobileNumberPattern.test(mobileNumber.toString());
}

export async function generateFileName(fileName: string): Promise<string> {
  const fileParts = fileName.split('.');
  const extension = fileParts.length > 1 ? fileParts.pop() : '';
  const nameWithoutExtension = fileParts.join('.');
  const sanitizedFileName = nameWithoutExtension.replace(/[^a-zA-Z0-9_]/g, '');
  const timestamp = Date.now();
  return extension
    ? `${timestamp}_${sanitizedFileName}.${extension}`
    : `${timestamp}_${sanitizedFileName}`;
}

// Helper function to parse MM/DD/YYYY into a valid Date
function parseDate(dateStr) {
  const [month, day, year] = dateStr.split('/'); // Split by '/'
  return new Date(`${year}-${month}-${day}T00:00:00.000Z`); // Convert to YYYY-MM-DD
}
