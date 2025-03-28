/**
 * Utilities for client-side storage with fallbacks
 */

// Check if localStorage is available
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Set item with fallback to memory if localStorage is not available
const memoryStore: Record<string, string> = {};

export const setStorageItem = (key: string, value: string): void => {
  try {
    if (isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    } else {
      memoryStore[key] = value;
    }
  } catch (e) {
    console.error('Error setting storage item:', e);
    memoryStore[key] = value;
  }
};

export const getStorageItem = (key: string): string | null => {
  try {
    if (isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    } else {
      return memoryStore[key] || null;
    }
  } catch (e) {
    console.error('Error getting storage item:', e);
    return memoryStore[key] || null;
  }
};

export const removeStorageItem = (key: string): void => {
  try {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    } else {
      delete memoryStore[key];
    }
  } catch (e) {
    console.error('Error removing storage item:', e);
    delete memoryStore[key];
  }
}; 