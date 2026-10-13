import React from 'react';
import type { PriceHistoryPoint, PriceTrend, Language } from '../../types';
import { getMarketTrendConfig } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceTrendChartProps {
  history: PriceHistoryPoint[];
  trend: PriceTrend | undefined;
  language: Language;
  unit: string;
}

export const PriceTrendChart: React.FC<PriceTrendChartProps> = ({
  history,
  trend,
  language,
  unit,
}) => {
  if (!history || history.length === 0) return null;

  const prices = history.map((h) => h.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = Math.max(1, maxPrice - minPrice);

  const trendConfig = getMarketTrendConfig(trend, language);

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-zinc-700 flex items-center gap-1">
          {trend?.isUp ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          ) : trend && !trend.isUp ? (
            <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
          ) : (
            <Minus className="w-3.5 h-3.5 text-zinc-500" />
          )}
          <span>{language === 'hi' ? '7-दिवसीय भाव रुझान:' : '7-Day Price Trend:'}</span>
        </span>

        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${trendConfig.className}`}>
          {trendConfig.text}
        </span>
      </div>

      {/* Micro Bar Chart */}
      <div className="grid grid-cols-7 gap-1.5 items-end h-16 pt-2 px-1">
        {history.map((pt, idx) => {
          const heightPercent = Math.max(25, Math.min(100, Math.round(((pt.price - minPrice) / range) * 75 + 25)));
          const isLatest = idx === history.length - 1;

          return (
            <div key={idx} className="flex flex-col items-center justify-end h-full group relative">
              {/* Tooltip */}
              <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-10">
                ₹{pt.price}
              </div>

              {/* Bar */}
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-sm transition-all ${
                  isLatest
                    ? trend?.isUp
                      ? 'bg-emerald-600'
                      : 'bg-rose-500'
                    : 'bg-zinc-300 group-hover:bg-zinc-400'
                }`}
              />

              {/* Label */}
              <span className={`text-[9px] mt-1 truncate ${isLatest ? 'font-bold text-zinc-900' : 'text-zinc-500'}`}>
                {pt.day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-200/60 font-medium">
        <span>{language === 'hi' ? `न्यूनतम: ₹${minPrice}/${unit}` : `Min: ₹${minPrice}/${unit}`}</span>
        <span>{language === 'hi' ? `उच्चतम: ₹${maxPrice}/${unit}` : `Max: ₹${maxPrice}/${unit}`}</span>
      </div>
    </div>
  );
};
