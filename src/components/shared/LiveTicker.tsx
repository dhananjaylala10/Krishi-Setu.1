import React from 'react';
import { useApp } from '../../context/AppContext';
import { CROPS, MANDIS } from '../../data/mockData';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export const LiveTicker: React.FC = () => {
  const { marketItems, language, selectedState, selectedCity, selectedMandi } = useApp();

  const highlights = React.useMemo(() => {
    let candidateItems = marketItems;
    if (selectedMandi !== 'all') {
      const mandiItems = marketItems.filter((item) => item.mandiId === selectedMandi);
      if (mandiItems.length > 0) candidateItems = mandiItems;
    } else if (selectedCity !== 'all') {
      const cityItems = marketItems.filter((item) => {
        const mandi = MANDIS.find((m) => m.id === item.mandiId);
        return mandi?.cityEn === selectedCity;
      });
      if (cityItems.length > 0) candidateItems = cityItems;
    } else if (selectedState !== 'all') {
      const stateItems = marketItems.filter((item) => {
        const mandi = MANDIS.find((m) => m.id === item.mandiId);
        return mandi?.stateEn === selectedState;
      });
      if (stateItems.length > 0) candidateItems = stateItems;
    }

    const sorted = [...candidateItems].sort((a, b) => {
      const aPrio = a.stockStatus === 'severe_shortage' ? 2 : a.stockStatus === 'low' ? 1 : 0;
      const bPrio = b.stockStatus === 'severe_shortage' ? 2 : b.stockStatus === 'low' ? 1 : 0;
      return bPrio - aPrio;
    });

    return sorted.slice(0, 12).map((item) => {
      const crop = CROPS.find((c) => c.id === item.cropId);
      const mandi = MANDIS.find((m) => m.id === item.mandiId);
      return {
        id: item.id,
        cropName: language === 'hi' ? crop?.nameHi : crop?.nameEn,
        icon: crop?.icon || '🌱',
        mandiCity: language === 'hi' ? (mandi?.nameHi || mandi?.cityHi) : (mandi?.nameEn || mandi?.cityEn),
        price: item.wholesalePrice,
        unit: language === 'hi' ? crop?.unitHi : crop?.unitEn,
        isShortage: item.stockStatus === 'severe_shortage' || item.stockStatus === 'low',
        trend: item.priceTrend,
        arrivals: item.arrivalQuintals || 120,
      };
    });
  }, [marketItems, language, selectedState, selectedCity, selectedMandi]);

  return (
    <div className="bg-zinc-950 text-white text-xs py-2 px-3 overflow-x-auto flex items-center gap-4 scrollbar-none border-b border-zinc-800">
      <div className="flex items-center gap-2 font-black uppercase tracking-wider text-emerald-400 whitespace-nowrap shrink-0 border-r border-zinc-800 pr-3">
        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
        <span>{language === 'hi' ? 'लाइव मंडी दरें:' : 'Live Mandi Ticker:'}</span>
      </div>

      <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap">
        {highlights.map((h) => (
          <div key={h.id} className="flex items-center gap-2 font-medium text-zinc-300 text-xs">
            <span>{h.icon}</span>
            <span className="font-bold text-white">{h.cropName}</span>
            <span className="text-zinc-500 text-[11px]">({h.mandiCity})</span>
            <span className="font-extrabold text-emerald-400">₹{h.price}</span>

            {/* Micro delta chip */}
            {h.trend && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  h.trend.isUp ? 'text-emerald-400 bg-emerald-950/60' : 'text-rose-400 bg-rose-950/60'
                }`}
              >
                {h.trend.isUp ? '▲' : '▼'} {h.trend.percent}%
              </span>
            )}

            {h.isShortage && (
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5">
                <AlertTriangle className="w-2.5 h-2.5" />
                <span>{language === 'hi' ? 'किल्लत' : 'Deficit'}</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
