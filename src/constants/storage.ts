export const STORAGE_KEYS = {
  ROLE: 'core_titan_role',
  LANG: 'core_titan_lang',
  MARKET_ITEMS: 'core_titan_market_items',
  MARKET_OVERRIDES: 'core_titan_market_overrides',
  FARMER_LISTINGS: 'core_titan_farmer_listings',
  GOVT_NOTICES: 'core_titan_govt_notices',
} as const;

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[SafeStorage] Failed to save key "${key}":`, e);
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      localStorage.removeItem(key);
    } catch {
      // Ignore cleanup error
    }
  },
};

