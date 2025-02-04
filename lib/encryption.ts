import CryptoJS from 'crypto-js';

const STORAGE_KEY = 'hotel_data';
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'pretty_deer_324';

export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decryptData(encryptedData: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Failed to decrypt data:', error);
    return null;
  }
}

export function securelyStoreHotelId(hotelId: string | null) {
  if (!hotelId) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  const encryptedData = encryptData(hotelId);
  localStorage.setItem(STORAGE_KEY, encryptedData);
}

export function securelyGetHotelId(): string | null {
  const encryptedData = localStorage.getItem(STORAGE_KEY);
  if (!encryptedData) return null;
  
  return decryptData(encryptedData);
} 