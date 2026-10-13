import React, { useState } from 'react';
import type { MarketItem, Mandi, Crop, Language } from '../../../types';
import { StockStatusBadge } from '../../shared/StockStatusBadge';
import { PriceTrendChart } from '../../shared/PriceTrendChart';
import { MapPin, Phone, MessageSquare, ReceiptText } from 'lucide-react';

interface MandiRateCardProps {
  item: MarketItem & { mandi?: Mandi };
  selectedCrop: Crop;
  language: Language;
  onOpenMandiSlip?: (item: MarketItem & { mandi?: Mandi }) => void;
}

export const MandiRateCard: React.FC<MandiRateCardProps> = ({
  item,
  selectedCrop,
  language,
  onOpenMandiSlip,
}) => {
  const [showTrend, setShowTrend] = useState<boolean>(false);

  const handleWhatsAppEnquiry = () => {
    const text = `नमस्ते ${item.merchantName} जी,\n` +
      `मैं *${selectedCrop.nameHi}* (${selectedCrop.nameEn}) की बिक्री हेतु संपर्क कर रहा हूँ।\n` +
      `आपकी मंडी: *${item.mandi?.nameHi}* (${item.mandi?.cityHi})\n` +
      `दर्ज थोक भाव: ₹${item.wholesalePrice}/${selectedCrop.unitHi}\n` +
      `कृपया आज की लॉट खरीद प्रक्रिया बताएं।\n` +
      `सत्यापित: कृषि सेतु प्लेटफॉर्म`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 p-4 transition-all hover:shadow-md flex flex-col justify-between space-y-3">
      <div>
        {/* Mandi header & Badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-zinc-900 text-base">
                {language === 'hi' ? item.mandi?.nameHi : item.mandi?.nameEn}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>
                {language === 'hi' ? item.mandi?.cityHi : item.mandi?.cityEn},{' '}
                {language === 'hi' ? item.mandi?.stateHi : item.mandi?.stateEn} • {item.mandi?.distanceKm} km
              </span>
            </p>
          </div>

          <StockStatusBadge status={item.stockStatus} language={language} />
        </div>

        {/* APMC Tag & Arrival Volume */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 bg-zinc-50 px-2.5 py-1.5 rounded-lg border border-zinc-100">
          <span className="font-mono text-zinc-600 font-semibold">
            {item.apmcLicense || 'APMC-VERIFIED'}
          </span>
          <span className="font-medium text-emerald-800">
            {language === 'hi'
              ? `दैनिक आवक: ${item.arrivalQuintals || 120} क्विंटल`
              : `Arrival: ${item.arrivalQuintals || 120} qtl`}
          </span>
        </div>

        {/* Price display */}
        <div className="bg-zinc-50/70 rounded-xl p-3 my-2.5 border border-zinc-200/70 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-zinc-500 font-semibold">
              {language === 'hi' ? 'थोक खरीद भाव (बोली)' : 'Wholesale Buy Rate'}
            </div>
            <div className="text-2xl font-black text-emerald-800">
              ₹{item.wholesalePrice}
              <span className="text-xs font-normal text-zinc-600 ml-1">
                /{language === 'hi' ? selectedCrop.unitHi : selectedCrop.unitEn}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-zinc-500 font-semibold">
              {language === 'hi' ? 'रिटेल काउंटर' : 'Retail Shelf'}
            </div>
            <div className="text-base font-bold text-zinc-700">₹{item.retailPrice}</div>
          </div>
        </div>

        {/* 7-Day Trend Toggle */}
        <div className="pt-1">
          <button
            onClick={() => setShowTrend(!showTrend)}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer"
          >
            {showTrend
              ? language === 'hi' ? 'रुझान छिपाएं ▲' : 'Hide Trend ▲'
              : language === 'hi' ? '7-दिवसीय भाव चार्ट देखें ▼' : 'View 7-Day Trend ▼'}
          </button>
        </div>

        {showTrend && item.history7Days && (
          <div className="mt-2">
            <PriceTrendChart
              history={item.history7Days}
              trend={item.priceTrend}
              language={language}
              unit={selectedCrop.unitHi}
            />
          </div>
        )}

        <div className="text-xs text-zinc-600 mt-2 space-y-0.5">
          <div>
            <span className="font-semibold text-zinc-800">
              {language === 'hi' ? 'व्यापारी/आढ़ती:' : 'Merchant:'}
            </span>{' '}
            {item.merchantName}
          </div>
          <div className="text-zinc-400 text-[11px]">{item.lastUpdated}</div>
        </div>
      </div>

      {/* Action Buttons: Call, WhatsApp & Mandi Slip */}
      <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${item.merchantContact}`}
            className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2 px-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
          </a>

          <button
            onClick={handleWhatsAppEnquiry}
            className="flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-900 text-white text-xs font-bold py-2 px-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </button>
        </div>

        {onOpenMandiSlip && (
          <button
            onClick={() => onOpenMandiSlip(item)}
            className="w-full flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold py-1.5 px-3 rounded-xl transition-colors cursor-pointer"
          >
            <ReceiptText className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'hi' ? 'डिजिटल मंडी पर्ची बनाएं' : 'Generate Mandi Slip'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
