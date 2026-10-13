import type { QualityGrade } from '../types';
import { FREIGHT_VEHICLES, APMC_CESS_PERCENT, QUALITY_GRADE_MULTIPLIERS } from '../constants/logistics';

export interface AdvancedProfitCalculationResult {
  gradePricePerKg: number;
  grossRevenue: number;
  estimatedFreight: number;
  apmcCess: number;
  netRealization: number;
  profitMarginPercent: number;
}

export const calculateAdvancedFarmerProfit = (
  quantityKg: number,
  basePricePerKg: number,
  distanceKm: number,
  vehicleId: string = 'tata_ace',
  grade: QualityGrade = 'B'
): AdvancedProfitCalculationResult => {
  const gradeInfo = QUALITY_GRADE_MULTIPLIERS[grade] || QUALITY_GRADE_MULTIPLIERS.B;
  const gradePricePerKg = Math.round(basePricePerKg * gradeInfo.multiplier * 10) / 10;
  const grossRevenue = Math.round(quantityKg * gradePricePerKg);

  const vehicle = FREIGHT_VEHICLES.find((v) => v.id === vehicleId) || FREIGHT_VEHICLES[0];
  const estimatedFreight = Math.round(vehicle.baseCharge + distanceKm * vehicle.ratePerKm);

  const apmcCess = Math.round((grossRevenue * APMC_CESS_PERCENT) / 100);
  const netRealization = Math.max(0, grossRevenue - estimatedFreight - apmcCess);
  const profitMarginPercent = grossRevenue > 0 ? Math.round((netRealization / grossRevenue) * 100) : 0;

  return {
    gradePricePerKg,
    grossRevenue,
    estimatedFreight,
    apmcCess,
    netRealization,
    profitMarginPercent,
  };
};

export interface ProfitCalculationResult {
  grossRevenue: number;
  netProfit: number;
}

export const calculateFarmerProfit = (
  quantityKg: number,
  pricePerKg: number,
  transportCost: number
): ProfitCalculationResult => {
  const grossRevenue = quantityKg * pricePerKg;
  const netProfit = grossRevenue - transportCost;
  return {
    grossRevenue,
    netProfit,
  };
};
