import React from 'react';
import type { Language } from '../../../types';
import { RefreshCw, ShieldCheck, Landmark } from 'lucide-react';

interface GovtMetricsGridProps {
  severeCount: number;
  lowStockCount: number;
  balancedCount: number;
  activeMandisCount: number;
  language: Language;
}

export const GovtMetricsGrid: React.FC<GovtMetricsGridProps> = ({
  severeCount,
  lowStockCount,
  balancedCount,
  activeMandisCount,
  language,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
      <div className="bg-white border border-rose-200 rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black text-rose-700 uppercase tracking-wider">
            {language === 'hi' ? 'गंभीर किल्लत (Red Alert)' : 'Acute Deficits'}
          </span>
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
        </div>
        <div className="text-3xl font-black text-rose-800 mt-2 tracking-tight">
          {severeCount}
        </div>
        <p className="text-[11px] text-zinc-500 mt-1 font-medium">
          {language === 'hi' ? 'मंडियों में तत्काल बफर आपूर्ति की आवश्यकता' : 'Markets requiring immediate buffer stock'}
        </p>
      </div>

      <div className="bg-white border border-amber-200 rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black text-amber-700 uppercase tracking-wider">
            {language === 'hi' ? 'सीमित आवक (Watchlist)' : 'Watchlist Nodes'}
          </span>
          <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
        </div>
        <div className="text-3xl font-black text-amber-900 mt-2 tracking-tight">
          {lowStockCount}
        </div>
        <p className="text-[11px] text-zinc-500 mt-1 font-medium">
          {language === 'hi' ? '48 घंटों में अंतर-जिला आवक निगरानी' : 'Inflow monitoring required in next 48h'}
        </p>
      </div>

      <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wider">
            {language === 'hi' ? 'संतुलित बाजार (Stable)' : 'Balanced Supply'}
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div className="text-3xl font-black text-emerald-900 mt-2 tracking-tight">
          {balancedCount}
        </div>
        <p className="text-[11px] text-zinc-500 mt-1 font-medium">
          {language === 'hi' ? 'पर्याप्त स्टॉक एवं संतुलित मूल्य स्तर' : 'Adequate buffer & stabilized retail rates'}
        </p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black text-zinc-700 uppercase tracking-wider">
            {language === 'hi' ? 'सक्रिय एपीएमसी नेटवर्क' : 'Active APMC Grid'}
          </span>
          <Landmark className="w-3.5 h-3.5 text-zinc-600" />
        </div>
        <div className="text-3xl font-black text-zinc-900 mt-2 tracking-tight">
          {activeMandisCount}
        </div>
        <p className="text-[11px] text-zinc-500 mt-1 font-medium">
          {language === 'hi' ? 'राष्ट्रीय ई-नाम समन्वय केंद्र' : 'National e-NAM synced terminal nodes'}
        </p>
      </div>
    </div>
  );
};
