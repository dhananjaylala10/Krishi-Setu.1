import React from 'react';
import type { MarketItem, Mandi, Crop, Language } from '../../../types';
import { Tag, MapPin } from 'lucide-react';

interface CheapestDealBannerProps {
  cheapestMandi: (MarketItem & { mandi?: Mandi }) | undefined;
  selectedCrop: Crop;
  language: Language;
}

export const CheapestDealBanner: React.FC<CheapestDealBannerProps> = ({
  cheapestMandi,
  selectedCrop,
  language,
}) => {
  if (!cheapestMandi) return null;

  const estimatedSavings = Math.max(3, Math.round(cheapestMandi.retailPrice * 0.18));

  return (
    <div className="bg-linear-to-r from-zinc-900 via-teal-950 to-zinc-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-teal-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
      <div className="flex items-start gap-3.5">
        <span className="text-4xl p-3 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-xs shrink-0">
          {selectedCrop.icon}
        </span>
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'उचित मूल्य बेंचमार्क (Fair Price)' : 'Fair Price Benchmark'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {language === 'hi'
              ? `${cheapestMandi.mandi?.nameHi} में ${selectedCrop.nameHi} न्यूनतम ₹${cheapestMandi.retailPrice}/kg पर उपलब्ध`
              : `${selectedCrop.nameEn} Available at ${cheapestMandi.mandi?.nameEn} for ₹${cheapestMandi.retailPrice}/kg`}
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm max-w-xl">
            {language === 'hi'
              ? `बाजार औसत से लगभग ₹${estimatedSavings}/kg की सीधी बचत • कुल ${cheapestMandi.stockQuantityKg.toLocaleString('en-IN')} kg ताजी आवक उपलब्ध है।`
              : `Save approx ₹${estimatedSavings}/kg over retail supermarket benchmarks with fresh direct APMC arrivals.`}
          </p>
        </div>
      </div>

      <div className="bg-white text-zinc-900 px-5 py-3.5 rounded-2xl shrink-0 text-center sm:text-right border border-zinc-200 shadow-md min-w-[170px] self-stretch sm:self-auto flex flex-col justify-center">
        <div className="text-[11px] text-zinc-500 font-bold uppercase">
          {language === 'hi' ? 'खुदरा काउंटर भाव' : 'Retail Mandi Counter'}
        </div>
        <div className="text-3xl font-black text-teal-800 tracking-tight my-0.5">
          ₹{cheapestMandi.retailPrice}
          <span className="text-xs text-zinc-500 font-normal ml-1">
            /{language === 'hi' ? selectedCrop.unitHi : selectedCrop.unitEn}
          </span>
        </div>
        <div className="text-[11px] text-zinc-500 font-medium flex items-center justify-center sm:justify-end gap-1">
          <MapPin className="w-3 h-3 text-zinc-400" />
          <span>{cheapestMandi.mandi?.cityHi} • {cheapestMandi.mandi?.distanceKm} km</span>
        </div>
      </div>
    </div>
  );
};
