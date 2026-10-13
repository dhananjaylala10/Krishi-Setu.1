import type { QualityGrade } from '../types';

export interface FreightVehicle {
  id: string;
  nameHi: string;
  nameEn: string;
  capacityTon: number;
  ratePerKm: number;
  baseCharge: number;
  icon: string;
}

export const FREIGHT_VEHICLES: FreightVehicle[] = [
  {
    id: 'tata_ace',
    nameHi: 'छोटा हाथी (Tata Ace)',
    nameEn: 'Mini Truck (Tata Ace)',
    capacityTon: 1.5,
    ratePerKm: 18,
    baseCharge: 500,
    icon: '🛻',
  },
  {
    id: 'canter_14ft',
    nameHi: '14-फुटा कैंटर (Canter)',
    nameEn: '14ft Canter (4 Ton)',
    capacityTon: 4.0,
    ratePerKm: 28,
    baseCharge: 900,
    icon: '🚚',
  },
  {
    id: 'truck_10t',
    nameHi: '6-टायर ट्रक (Heavy 10-Ton)',
    nameEn: '6-Tyre Truck (10 Ton)',
    capacityTon: 10.0,
    ratePerKm: 42,
    baseCharge: 1500,
    icon: '🚛',
  },
];

export const APMC_CESS_PERCENT = 1.5; // 1.5% APMC market fee

export const QUALITY_GRADE_MULTIPLIERS: Record<QualityGrade, { multiplier: number; labelHi: string; labelEn: string; badgeColor: string }> = {
  A: {
    multiplier: 1.15,
    labelHi: 'Grade A (सुपर/प्रीमियम)',
    labelEn: 'Grade A (Premium)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  B: {
    multiplier: 1.0,
    labelHi: 'Grade B (मध्यम/मानक)',
    labelEn: 'Grade B (Standard)',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  C: {
    multiplier: 0.85,
    labelHi: 'Grade C (सामान्य/प्रोसेसिंग)',
    labelEn: 'Grade C (Fair)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
};
