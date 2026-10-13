import type { Crop, Language, StockStatus, PriceTrend } from '../types';

export const formatCropPrice = (price: number, crop: Crop, lang: Language): string => {
  const unit = lang === 'hi' ? crop.unitHi : crop.unitEn;
  return `₹${price}/${unit}`;
};

export const formatCurrencyINR = (amount: number): string => {
  return '₹' + amount.toLocaleString('en-IN');
};

export const formatQuintals = (amountQuintals: number, lang: Language = 'hi'): string => {
  return `${amountQuintals.toLocaleString('en-IN')} ${lang === 'hi' ? 'क्विंटल' : 'qtl'}`;
};

export interface StockBadgeConfig {
  label: string;
  className: string;
  dotColor: string;
  isSevere: boolean;
}

export const getStockBadgeConfig = (status: StockStatus, lang: Language): StockBadgeConfig => {
  switch (status) {
    case 'severe_shortage':
      return {
        label: lang === 'hi' ? 'अति-मांग (किल्लत)' : 'Critical Shortage',
        className: 'bg-rose-50 text-rose-700 border border-rose-200 font-bold',
        dotColor: 'bg-rose-500 animate-ping',
        isSevere: true,
      };
    case 'low':
      return {
        label: lang === 'hi' ? 'सीमित आवक' : 'Low Inflow',
        className: 'bg-amber-50 text-amber-700 border border-amber-200 font-semibold',
        dotColor: 'bg-amber-500',
        isSevere: false,
      };
    case 'surplus':
      return {
        label: lang === 'hi' ? 'अधिशेष आवक' : 'Surplus Arrival',
        className: 'bg-sky-50 text-sky-700 border border-sky-200 font-semibold',
        dotColor: 'bg-sky-500',
        isSevere: false,
      };
    case 'normal':
    default:
      return {
        label: lang === 'hi' ? 'संतुलित आवक' : 'Balanced Supply',
        className: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium',
        dotColor: 'bg-emerald-500',
        isSevere: false,
      };
  }
};

export const getMarketTrendConfig = (trend: PriceTrend | undefined, lang: Language = 'hi') => {
  if (!trend) {
    return {
      text: lang === 'hi' ? 'भाव स्थिर' : 'Price Stable',
      className: 'bg-zinc-100 text-zinc-700 border-zinc-200',
      arrow: '●',
    };
  }
  if (trend.isUp) {
    return {
      text: `+₹${trend.change} (+${trend.percent}%) ${lang === 'hi' ? 'तेजी' : 'Bullish'}`,
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      arrow: '▲',
    };
  }
  return {
    text: `-₹${trend.change} (-${trend.percent}%) ${lang === 'hi' ? 'मंदी' : 'Bearish'}`,
    className: 'bg-rose-50 text-rose-700 border-rose-200',
    arrow: '▼',
  };
};
