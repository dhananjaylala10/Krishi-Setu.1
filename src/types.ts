export type UserRole = 'farmer' | 'merchant' | 'govt' | 'consumer';

export type Language = 'hi' | 'en';

export type StockStatus = 'surplus' | 'normal' | 'low' | 'severe_shortage';

export type CropCategory = 'vegetable' | 'grain' | 'pulse' | 'spice' | 'fruit' | 'cash';

export type QualityGrade = 'A' | 'B' | 'C';

export interface PriceTrend {
  change: number;
  percent: number;
  isUp: boolean;
}

export interface PriceHistoryPoint {
  day: string;
  price: number;
}

export interface Crop {
  id: string;
  nameHi: string;
  nameEn: string;
  category: CropCategory;
  icon: string;
  unitHi: string;
  unitEn: string;
  basePrice: number;
}

export interface Mandi {
  id: string;
  nameHi: string;
  nameEn: string;
  cityHi: string;
  cityEn: string;
  stateHi: string;
  stateEn: string;
  distanceKm: number;
}

export interface MarketItem {
  id: string;
  mandiId: string;
  cropId: string;
  wholesalePrice: number; // ₹ per kg
  retailPrice: number;    // ₹ per kg
  stockStatus: StockStatus;
  stockQuantityKg: number;
  merchantName: string;
  merchantContact: string;
  lastUpdated: string;
  arrivalQuintals?: number;
  priceTrend?: PriceTrend;
  history7Days?: PriceHistoryPoint[];
  apmcLicense?: string;
  isOpen?: boolean;
}

export interface FarmerListing {
  id: string;
  farmerName: string;
  cropId: string;
  quantityKg: number;
  expectedPrice: number;
  location: string;
  contact: string;
  createdAt: string;
  qualityGrade?: QualityGrade;
  expectedDate?: string;
}

export interface GovtNotice {
  id: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  type: 'shortage_alert' | 'advisory' | 'price_control';
  mandiId?: string;
  cropId?: string;
  date: string;
}

export interface DayForecast {
  dayHi: string;
  dayEn: string;
  tempMax: number;
  tempMin: number;
  rainProb: number;
  weatherCode: number;
}

export interface WeatherData {
  locationName: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  weatherCode: number;
  weatherLabelHi: string;
  weatherLabelEn: string;
  isRainy: boolean;
  transitStatus: 'safe' | 'caution' | 'alert';
  advisoryHi: string;
  advisoryEn: string;
  forecast3Days: DayForecast[];
  isLive: boolean;
  lastUpdatedTime: string;
}

