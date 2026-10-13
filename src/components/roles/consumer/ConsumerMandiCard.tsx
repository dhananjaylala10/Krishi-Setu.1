import React from 'react';
import type { MarketItem, Mandi, Crop, Language } from '../../../types';
import { StockStatusBadge } from '../../shared/StockStatusBadge';
import { Phone, MapPin } from 'lucide-react';

interface ConsumerMandiCardProps {
  item: MarketItem & { mandi?: Mandi };
  selectedCrop: Crop;
  isBest: boolean;
  language: Language;
}

export const ConsumerMandiCard: React.FC<ConsumerMandiCardProps> = ({
  item,
  selectedCrop,
  isBest,
  language,
}) => {
  const isShortage = item.stockStatus === 'severe_shortage';

  return (
    <div
      className={`bg-white rounded-2xl border p-4 transition-all hover:shadow-md flex flex-col justify-between space-y-3 ${
        isBest
          ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
          : isShortage
          ? 'border-rose-300'
          : 'border-zinc-200'
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-black text-zinc-900 text-base">
              {language === 'hi' ? item.mandi?.cityHi : item.mandi?.cityEn}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>{language === 'hi' ? item.mandi?.nameHi : item.mandi?.nameEn}</span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            {isBest && (
              <span className="bg-teal-100 text-teal-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-teal-200">
                {language === 'hi' ? 'सर्वश्रेष्ठ दर' : 'Best Rate'}
              </span>
            )}
            <StockStatusBadge status={item.stockStatus} language={language} />
          </div>
        </div>

        {/* Rates */}
        <div className="bg-zinc-50 rounded-xl p-3 my-2.5 border border-zinc-200/70 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-zinc-500 font-semibold">
              {language === 'hi' ? 'उपभोक्ता खुदरा दर' : 'Retail Mandi Rate'}
            </div>
            <div className="text-2xl font-black text-teal-900">
              ₹{item.retailPrice}
              <span className="text-xs font-normal text-zinc-500 ml-1">
                /{language === 'hi' ? selectedCrop.unitHi : selectedCrop.unitEn}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-zinc-400 font-medium">
              {language === 'hi' ? 'मंडी थोक' : 'Wholesale Ref'}
            </div>
            <div className="text-sm font-bold text-zinc-700">₹{item.wholesalePrice}</div>
          </div>
        </div>

        {/* Availability Stats */}
        <div className="space-y-1.5 text-xs text-zinc-600 bg-zinc-50/50 p-2.5 rounded-xl border border-zinc-100 font-medium">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">{language === 'hi' ? 'दैनिक आवक:' : 'Arrival Volume:'}</span>
            <span className="font-bold text-zinc-800">{item.arrivalQuintals || 120} qtl</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500">{language === 'hi' ? 'कुल उपलब्ध स्टॉक:' : 'Total Mandi Stock:'}</span>
            <span className="font-bold text-zinc-800">{item.stockQuantityKg.toLocaleString('en-IN')} kg</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500">{language === 'hi' ? 'दूरी:' : 'Distance:'}</span>
            <span className="font-semibold text-zinc-700">{item.mandi?.distanceKm} km</span>
          </div>
        </div>
      </div>

      {/* Merchant Contact */}
      <div className="pt-2 border-t border-zinc-100">
        <a
          href={`tel:${item.merchantContact}`}
          className="flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 px-3 rounded-xl text-xs transition-colors w-full cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-teal-400" />
          <span>
            {language === 'hi'
              ? `दुकानदार से संपर्क (${item.merchantName})`
              : `Contact Merchant (${item.merchantName})`}
          </span>
        </a>
      </div>
    </div>
  );
};
