import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole, Language, MarketItem, FarmerListing, GovtNotice, StockStatus, QualityGrade } from '../types';
import { INITIAL_MARKET_ITEMS, INITIAL_FARMER_LISTINGS, INITIAL_GOVT_NOTICES, MANDIS } from '../data/mockData';
import { STORAGE_KEYS, safeStorage } from '../constants/storage';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedMandi: string;
  setSelectedMandi: (mandiId: string) => void;
  selectMandiDirectly: (mandiId: string) => void;
  searchLocationQuery: string;
  setSearchLocationQuery: (q: string) => void;
  marketItems: MarketItem[];
  farmerListings: FarmerListing[];
  govtNotices: GovtNotice[];
  updateMarketItem: (
    mandiId: string,
    cropId: string,
    newStatus: StockStatus,
    newWholesalePrice?: number,
    newRetailPrice?: number,
    newStockQty?: number
  ) => void;
  addFarmerListing: (listing: {
    farmerName: string;
    cropId: string;
    quantityKg: number;
    expectedPrice: number;
    location: string;
    contact: string;
    qualityGrade?: QualityGrade;
    expectedDate?: string;
  }) => void;
  releaseBufferStock: (mandiId: string, cropId: string) => void;
  resetAllData: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (safeStorage.getItem(STORAGE_KEYS.ROLE) as UserRole) || 'farmer';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (safeStorage.getItem(STORAGE_KEYS.LANG) as Language) || 'hi';
  });

  const [selectedState, setSelectedStateValue] = useState<string>('all');
  const [selectedCity, setSelectedCityValue] = useState<string>('all');
  const [selectedMandi, setSelectedMandi] = useState<string>('all');
  const [searchLocationQuery, setSearchLocationQuery] = useState<string>('');

  const setSelectedState = (state: string) => {
    setSelectedStateValue(state);
    setSelectedCityValue('all');
    setSelectedMandi('all');
  };

  const setSelectedCity = (city: string) => {
    setSelectedCityValue(city);
    setSelectedMandi('all');
  };

  const selectMandiDirectly = (mandiId: string) => {
    if (mandiId === 'all') {
      setSelectedMandi('all');
      return;
    }
    const found = MANDIS.find((m) => m.id === mandiId);
    if (found) {
      setSelectedStateValue(found.stateEn);
      setSelectedCityValue(found.cityEn);
      setSelectedMandi(mandiId);
    } else {
      setSelectedMandi(mandiId);
    }
  };

  const [marketItems, setMarketItems] = useState<MarketItem[]>(() => {
    // Release legacy large blob from storage to avoid quota errors
    safeStorage.removeItem(STORAGE_KEYS.MARKET_ITEMS);

    const savedOverrides = safeStorage.getItem(STORAGE_KEYS.MARKET_OVERRIDES);
    if (!savedOverrides) return INITIAL_MARKET_ITEMS;

    try {
      const overrides: Record<string, Partial<MarketItem>> = JSON.parse(savedOverrides);
      return INITIAL_MARKET_ITEMS.map((item) => {
        const itemOverride = overrides[item.id];
        return itemOverride ? { ...item, ...itemOverride } : item;
      });
    } catch {
      return INITIAL_MARKET_ITEMS;
    }
  });

  const [farmerListings, setFarmerListings] = useState<FarmerListing[]>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.FARMER_LISTINGS);
    try {
      return saved ? JSON.parse(saved) : INITIAL_FARMER_LISTINGS;
    } catch {
      return INITIAL_FARMER_LISTINGS;
    }
  });

  const [govtNotices, setGovtNotices] = useState<GovtNotice[]>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.GOVT_NOTICES);
    try {
      return saved ? JSON.parse(saved) : INITIAL_GOVT_NOTICES;
    } catch {
      return INITIAL_GOVT_NOTICES;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    safeStorage.setItem(STORAGE_KEYS.ROLE, newRole);
  };

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    safeStorage.setItem(STORAGE_KEYS.LANG, newLang);
  };

  useEffect(() => {
    // Only store modified items (delta overrides) to keep localStorage footprint < 2 KB
    const initialMap = new Map(INITIAL_MARKET_ITEMS.map((i) => [i.id, i]));
    const deltaOverrides: Record<string, Partial<MarketItem>> = {};
    let hasModifications = false;

    for (const item of marketItems) {
      const original = initialMap.get(item.id);
      if (!original) continue;

      if (
        item.stockStatus !== original.stockStatus ||
        item.wholesalePrice !== original.wholesalePrice ||
        item.retailPrice !== original.retailPrice ||
        item.stockQuantityKg !== original.stockQuantityKg ||
        item.lastUpdated !== original.lastUpdated
      ) {
        hasModifications = true;
        deltaOverrides[item.id] = {
          stockStatus: item.stockStatus,
          wholesalePrice: item.wholesalePrice,
          retailPrice: item.retailPrice,
          stockQuantityKg: item.stockQuantityKg,
          lastUpdated: item.lastUpdated,
        };
      }
    }

    if (hasModifications) {
      safeStorage.setItem(STORAGE_KEYS.MARKET_OVERRIDES, JSON.stringify(deltaOverrides));
    } else {
      safeStorage.removeItem(STORAGE_KEYS.MARKET_OVERRIDES);
    }
  }, [marketItems]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.FARMER_LISTINGS, JSON.stringify(farmerListings));
  }, [farmerListings]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.GOVT_NOTICES, JSON.stringify(govtNotices));
  }, [govtNotices]);

  const updateMarketItem = (
    mandiId: string,
    cropId: string,
    newStatus: StockStatus,
    newWholesalePrice?: number,
    newRetailPrice?: number,
    newStockQty?: number
  ) => {
    setMarketItems((prev) =>
      prev.map((item) => {
        if (item.mandiId === mandiId && item.cropId === cropId) {
          return {
            ...item,
            stockStatus: newStatus,
            wholesalePrice: newWholesalePrice !== undefined ? newWholesalePrice : item.wholesalePrice,
            retailPrice: newRetailPrice !== undefined ? newRetailPrice : item.retailPrice,
            stockQuantityKg: newStockQty !== undefined ? newStockQty : item.stockQuantityKg,
            lastUpdated: language === 'hi' ? 'अभी अपडेट किया गया' : 'Just updated',
          };
        }
        return item;
      })
    );

    // Also update government alert if severe shortage
    if (newStatus === 'severe_shortage') {
      const notice: GovtNotice = {
        id: 'gn-' + Date.now(),
        titleHi: 'अलर्ट: मंडी में गंभीर किल्लत दर्ज!',
        titleEn: 'Alert: Critical Shortage Reported!',
        descHi: 'मर्चेंट द्वारा तात्कालिक कमी की सूचना दर्ज की गई है। किसानों को प्राथमिकता से फसल भेजने का सुझाव है।',
        descEn: 'Urgent stock shortage reported by merchant. Farmers advised to supply at premium rates.',
        type: 'shortage_alert',
        cropId,
        mandiId,
        date: language === 'hi' ? 'अभी-अभी' : 'Just now',
      };
      setGovtNotices((prev) => [notice, ...prev]);
    }

    showToast(
      language === 'hi'
        ? '✅ स्टॉक व रेट अपडेट सफल! किसान, मर्चेंट और कंज्यूमर स्क्रीन पर लाइव रिफ्लेक्ट हो गया है।'
        : '✅ Stock & Rate updated successfully! Live reflected across all portals.'
    );
  };

  const addFarmerListing = (listing: {
    farmerName: string;
    cropId: string;
    quantityKg: number;
    expectedPrice: number;
    location: string;
    contact: string;
    qualityGrade?: QualityGrade;
    expectedDate?: string;
  }) => {
    const newEntry: FarmerListing = {
      id: 'fl-' + Date.now(),
      ...listing,
      createdAt: language === 'hi' ? 'अभी-अभी' : 'Just now',
    };
    setFarmerListings((prev) => [newEntry, ...prev]);
    showToast(
      language === 'hi'
        ? '🌾 फसल लिस्टिंग सफलतापूर्वक पोस्ट हो गई! मर्चेंट इसे तुरंत देख सकते हैं।'
        : '🌾 Crop listing successfully posted! Merchants can view it immediately.'
    );
  };

  const releaseBufferStock = (mandiId: string, cropId: string) => {
    setMarketItems((prev) =>
      prev.map((item) => {
        if (item.mandiId === mandiId && item.cropId === cropId) {
          return {
            ...item,
            stockStatus: 'normal',
            stockQuantityKg: item.stockQuantityKg + 15000,
            wholesalePrice: Math.max(15, item.wholesalePrice - 6),
            retailPrice: Math.max(20, item.retailPrice - 7),
            lastUpdated: language === 'hi' ? 'सरकारी बफर स्टॉक रिलीज' : 'Govt buffer stock released',
          };
        }
        return item;
      })
    );

    showToast(
      language === 'hi'
        ? '🏛️ सरकारी आदेश: 15,000 कि.ग्रा. बफर स्टॉक रिलीज किया गया! दाम नियंत्रित हो गए।'
        : '🏛️ Govt Action: 15,000 kg buffer stock released! Price stabilized.'
    );
  };

  const resetAllData = () => {
    setMarketItems(INITIAL_MARKET_ITEMS);
    setFarmerListings(INITIAL_FARMER_LISTINGS);
    setGovtNotices(INITIAL_GOVT_NOTICES);
    setSelectedStateValue('all');
    setSelectedCityValue('all');
    setSelectedMandi('all');
    setSearchLocationQuery('');
    safeStorage.removeItem(STORAGE_KEYS.MARKET_ITEMS);
    safeStorage.removeItem(STORAGE_KEYS.MARKET_OVERRIDES);
    safeStorage.removeItem(STORAGE_KEYS.FARMER_LISTINGS);
    safeStorage.removeItem(STORAGE_KEYS.GOVT_NOTICES);
    showToast(language === 'hi' ? 'डेटा रीसेट कर दिया गया है' : 'Data reset to default');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        selectedState,
        setSelectedState,
        selectedCity,
        setSelectedCity,
        selectedMandi,
        setSelectedMandi,
        selectMandiDirectly,
        searchLocationQuery,
        setSearchLocationQuery,
        marketItems,
        farmerListings,
        govtNotices,
        updateMarketItem,
        addFarmerListing,
        releaseBufferStock,
        resetAllData,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
