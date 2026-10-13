import React, { useState } from 'react';
import type { MarketItem, Crop, StockStatus, Language } from '../../../types';
import { Save } from 'lucide-react';

interface MerchantCropCardProps {
  item: MarketItem;
  crop: Crop | undefined;
  language: Language;
  onUpdateStatus: (newStatus: StockStatus) => void;
  onSavePrices: (wholesale: number, retail: number) => void;
}

export const MerchantCropCard: React.FC<MerchantCropCardProps> = ({
  item,
  crop,
  language,
  onUpdateStatus,
  onSavePrices,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempWholesale, setTempWholesale] = useState<number>(item.wholesalePrice);
  const [tempRetail, setTempRetail] = useState<number>(item.retailPrice);

  const handleStartEdit = () => {
    setTempWholesale(item.wholesalePrice);
    setTempRetail(item.retailPrice);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onSavePrices(tempWholesale, tempRetail);
    setIsEditing(false);
  };

  const tradeMargin = item.retailPrice - item.wholesalePrice;
  const marginPercent = item.wholesalePrice > 0 ? Math.round((tradeMargin / item.wholesalePrice) * 100) : 0;

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 transition-all hover:border-zinc-400 hover:shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Crop Info */}
        <div className="flex items-center gap-3 min-w-[200px]">
          <span className="text-3xl p-2.5 bg-zinc-50 rounded-2xl border border-zinc-200 shadow-2xs">
            {crop?.icon}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-base text-zinc-900">
                {language === 'hi' ? crop?.nameHi : crop?.nameEn}
              </h3>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 px-1.5 py-0.2 rounded">
                LOT-{crop?.id.slice(-4).toUpperCase()}
              </span>
            </div>
            <div className="text-xs text-zinc-500 mt-0.5 font-medium">
              <span>{language === 'hi' ? 'दैनिक आवक:' : 'Arrival:'} </span>
              <span className="font-bold text-zinc-800">{item.arrivalQuintals || 120} qtl</span>
              <span className="mx-1 text-zinc-300">•</span>
              <span className="text-emerald-700 font-semibold">स्प्रेड: +₹{tradeMargin} ({marginPercent}%)</span>
            </div>
          </div>
        </div>

        {/* Stock Status Broadcast Selector */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            {language === 'hi' ? 'मंडी आवक व आपूर्ति स्थिति:' : 'Mandi Inflow & Stock Level:'}
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Severe Shortage */}
            <button
              onClick={() => onUpdateStatus('severe_shortage')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                item.stockStatus === 'severe_shortage'
                  ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400'
                  : 'bg-zinc-50 text-rose-700 border border-zinc-200 hover:bg-rose-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
              <span>{language === 'hi' ? 'अति-मांग (किल्लत)' : 'Deficit Shortage'}</span>
            </button>

            {/* Low Stock */}
            <button
              onClick={() => onUpdateStatus('low')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                item.stockStatus === 'low'
                  ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400'
                  : 'bg-zinc-50 text-amber-800 border border-zinc-200 hover:bg-amber-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{language === 'hi' ? 'सीमित आवक' : 'Low Inflow'}</span>
            </button>

            {/* Normal */}
            <button
              onClick={() => onUpdateStatus('normal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                item.stockStatus === 'normal'
                  ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-400'
                  : 'bg-zinc-50 text-emerald-800 border border-zinc-200 hover:bg-emerald-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{language === 'hi' ? 'संतुलित आवक' : 'Normal'}</span>
            </button>

            {/* Surplus */}
            <button
              onClick={() => onUpdateStatus('surplus')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                item.stockStatus === 'surplus'
                  ? 'bg-sky-600 text-white shadow-xs ring-2 ring-sky-400'
                  : 'bg-zinc-50 text-sky-800 border border-zinc-200 hover:bg-sky-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>{language === 'hi' ? 'अधिशेष आवक' : 'Surplus'}</span>
            </button>
          </div>
        </div>

        {/* Trade Price & Bid Editor */}
        <div className="flex items-center gap-3 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/80">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <div>
                <label className="text-[10px] block font-bold text-zinc-500">
                  {language === 'hi' ? 'थोक खरीद ₹' : 'Wholesale Buy ₹'}
                </label>
                <input
                  type="number"
                  className="w-18 px-2 py-1 text-sm border rounded-lg font-bold bg-white text-zinc-900"
                  value={tempWholesale}
                  onChange={(e) => setTempWholesale(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="text-[10px] block font-bold text-zinc-500">
                  {language === 'hi' ? 'रिटेल विक्रय ₹' : 'Retail Sell ₹'}
                </label>
                <input
                  type="number"
                  className="w-18 px-2 py-1 text-sm border rounded-lg font-bold bg-white text-zinc-900"
                  value={tempRetail}
                  onChange={(e) => setTempRetail(Number(e.target.value))}
                />
              </div>
              <button
                onClick={handleSaveEdit}
                className="bg-emerald-700 hover:bg-emerald-800 text-white p-2 rounded-lg text-xs font-bold mt-3 cursor-pointer shadow-2xs"
                title="Save Bid"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div>
                <div className="text-[10px] text-zinc-400 uppercase font-bold">
                  {language === 'hi' ? 'थोक खरीद बोली' : 'Wholesale Bid'}
                </div>
                <div className="text-base font-black text-zinc-900">
                  ₹{item.wholesalePrice}
                </div>
              </div>
              <div className="border-l border-zinc-200 pl-3">
                <div className="text-[10px] text-zinc-400 uppercase font-bold">
                  {language === 'hi' ? 'रिटेल काउंटर' : 'Retail Shelf'}
                </div>
                <div className="text-base font-bold text-zinc-700">₹{item.retailPrice}</div>
              </div>
              <button
                onClick={handleStartEdit}
                className="ml-1 text-xs text-emerald-700 hover:text-emerald-900 underline font-extrabold cursor-pointer"
              >
                {language === 'hi' ? 'दर संशोधित करें' : 'Edit Bid'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
