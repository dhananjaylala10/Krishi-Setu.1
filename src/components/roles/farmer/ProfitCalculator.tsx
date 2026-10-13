import React, { useState } from 'react';
import type { MarketItem, Mandi, Crop, Language, QualityGrade } from '../../../types';
import { FREIGHT_VEHICLES } from '../../../constants/logistics';
import { calculateAdvancedFarmerProfit } from '../../../utils/calculations';
import { Calculator, ReceiptText } from 'lucide-react';

interface ProfitCalculatorProps {
  bestMandi: (MarketItem & { mandi?: Mandi }) | undefined;
  selectedCrop: Crop;
  language: Language;
  onOpenMandiSlip?: (customData: {
    quantityKg: number;
    grade: QualityGrade;
    ratePerKg: number;
    grossAmount: number;
    freightCost: number;
    apmcCess: number;
    netPayout: number;
  }) => void;
}

export const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({
  bestMandi,
  selectedCrop,
  language,
  onOpenMandiSlip,
}) => {
  const [calcQty, setCalcQty] = useState<number>(1000);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('tata_ace');
  const [selectedGrade, setSelectedGrade] = useState<QualityGrade>('B');

  const distanceKm = bestMandi?.mandi?.distanceKm || 35;
  const basePrice = bestMandi?.wholesalePrice || selectedCrop.basePrice;

  const result = calculateAdvancedFarmerProfit(
    calcQty,
    basePrice,
    distanceKm,
    selectedVehicle,
    selectedGrade
  );

  const handleGenerateSlip = () => {
    if (onOpenMandiSlip) {
      onOpenMandiSlip({
        quantityKg: calcQty,
        grade: selectedGrade,
        ratePerKg: result.gradePricePerKg,
        grossAmount: result.grossRevenue,
        freightCost: result.estimatedFreight,
        apmcCess: result.apmcCess,
        netPayout: result.netRealization,
      });
    }
  };

  return (
    <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-zinc-900">
              {language === 'hi' ? 'परिवहन व्यय एवं शुद्ध लाभ आंकलन' : 'Logistics & Net Margin Estimator'}
            </h2>
            <p className="text-xs text-zinc-500">
              {language === 'hi'
                ? 'गुणवत्ता ग्रेड, वाहन भाड़ा एवं 1.5% एपीएमसी सेस काटकर किसान की शुद्ध इन-हैंड प्राप्ति'
                : 'Calculates net in-hand realization factoring freight, grade and 1.5% APMC market cess'}
            </p>
          </div>
        </div>

        {bestMandi && (
          <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            📍 {bestMandi.mandi?.cityHi} ({distanceKm} किमी)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {/* Input 1: Quantity */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
            {language === 'hi' ? 'मात्रा (कि.ग्रा.)' : 'Quantity (kg)'}
          </label>
          <input
            type="number"
            min="50"
            step="50"
            value={calcQty}
            onChange={(e) => setCalcQty(Math.max(1, Number(e.target.value)))}
            className="w-full px-3 py-2 text-base font-bold bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-zinc-900"
          />
        </div>

        {/* Input 2: Quality Grade */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
            {language === 'hi' ? 'गुणवत्ता ग्रेडिंग' : 'Quality Grade'}
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['A', 'B', 'C'] as QualityGrade[]).map((g) => {
              const isActive = selectedGrade === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGrade(g)}
                  className={`py-2 px-1 rounded-xl text-xs font-extrabold text-center border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <div>Grade {g}</div>
                  <div className="text-[10px] font-normal opacity-80">
                    {g === 'A' ? '+15%' : g === 'B' ? 'Base' : '-15%'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input 3: Vehicle Fleet */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 uppercase mb-1 flex items-center justify-between">
            <span>{language === 'hi' ? 'वाहन एवं भाड़ा मॉडल' : 'Fleet Freight Model'}</span>
            <span className="text-[10px] text-zinc-400 font-normal">₹/km rate</span>
          </label>
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm font-bold bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 cursor-pointer text-zinc-900"
          >
            {FREIGHT_VEHICLES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.icon} {language === 'hi' ? v.nameHi : v.nameEn} (₹{v.ratePerKm}/km)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Net Calculation Breakdown Card */}
      <div className="bg-zinc-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-b border-zinc-800 pb-3">
          <div>
            <div className="text-zinc-400 text-[11px]">ग्रेड भाव (Effective Rate)</div>
            <div className="text-base font-extrabold text-white mt-0.5">₹{result.gradePricePerKg}/kg</div>
          </div>
          <div>
            <div className="text-zinc-400 text-[11px]">सकल बिक्री (Gross Revenue)</div>
            <div className="text-base font-extrabold text-white mt-0.5">₹{result.grossRevenue.toLocaleString('en-IN')}</div>
          </div>
          <div>
            <div className="text-zinc-400 text-[11px]">अनुमानित भाड़ा (Freight)</div>
            <div className="text-base font-bold text-rose-400 mt-0.5">-₹{result.estimatedFreight.toLocaleString('en-IN')}</div>
          </div>
          <div>
            <div className="text-zinc-400 text-[11px]">मंडी शुल्क (1.5% APMC)</div>
            <div className="text-base font-bold text-rose-400 mt-0.5">-₹{result.apmcCess.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div>
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
              {language === 'hi' ? 'शुद्ध इन-हैंड प्राप्ति (Net In-Hand Realization)' : 'Net In-Hand Earnings'}
            </div>
            <div className="text-3xl font-black text-white tracking-tight">
              ₹{result.netRealization.toLocaleString('en-IN')}
              <span className="text-xs font-semibold text-emerald-400 ml-2">
                ({result.profitMarginPercent}% शुद्ध मार्जिन)
              </span>
            </div>
          </div>

          <button
            onClick={handleGenerateSlip}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer text-xs sm:text-sm"
          >
            <ReceiptText className="w-4 h-4" />
            <span>{language === 'hi' ? 'डिजिटल मंडी पर्ची बनाएं' : 'Generate Mandi Voucher'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
