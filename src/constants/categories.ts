import type { Crop } from '../types';

export interface CropCategoryOption {
  id: string;
  labelHi: string;
  labelEn: string;
  filterFn: (crop: Crop) => boolean;
}

export const CROP_CATEGORIES: CropCategoryOption[] = [
  {
    id: 'all',
    labelHi: '🌱 सभी',
    labelEn: '🌱 All',
    filterFn: () => true,
  },
  {
    id: 'vegetable',
    labelHi: '🥬 सब्जियां',
    labelEn: '🥬 Vegetables',
    filterFn: (crop) => crop.category === 'vegetable',
  },
  {
    id: 'grain_pulse',
    labelHi: '🌾 अनाज व दालें',
    labelEn: '🌾 Grains & Pulses',
    filterFn: (crop) => crop.category === 'grain' || crop.category === 'pulse',
  },
  {
    id: 'spice',
    labelHi: '🧄 मसाले',
    labelEn: '🧄 Spices',
    filterFn: (crop) => crop.category === 'spice',
  },
  {
    id: 'fruit_cash',
    labelHi: '🍎 फल व नकदी',
    labelEn: '🍎 Fruits & Cash',
    filterFn: (crop) => crop.category === 'fruit' || crop.category === 'cash',
  },
];

export const matchesCropSearch = (crop: Crop, query: string): boolean => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    crop.nameHi.toLowerCase().includes(q) ||
    crop.nameEn.toLowerCase().includes(q)
  );
};
