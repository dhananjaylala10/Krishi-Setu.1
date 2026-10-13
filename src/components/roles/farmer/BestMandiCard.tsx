import React from 'react';
import type { MarketItem, Mandi, Crop, Language } from '../../../types';
import { TrendingUp, MapPin, Share2, ShieldCheck } from 'lucide-react';

interface BestMandiCardProps {
  bestMandi: (MarketItem & { mandi?: Mandi }) | undefined;
  selectedCrop: Crop;
  language: Language;
}

export const BestMandiCard: React.FC<BestMandiCardProps> = ({
  bestMandi,
  selectedCrop,
  language,
}) => {
  if (!bestMandi) return null;

  const isSevere = bestMandi.stockStatus === 'severe_shortage';

  const handleShareWhatsApp = () => {
    const text = `🌾 *कृषि सेतु लाइव मंडी अलर्ट*\n` +
      `जिंस: ${selectedCrop.nameHi} (${selectedCrop.nameEn})\n` +
      `सर्वोच्च थोक भाव: ₹${bestMandi.wholesalePrice}/${selectedCrop.unitHi}\n` +
      `मंडी: ${bestMandi.mandi?.nameHi} (${bestMandi.mandi?.cityHi}, ${bestMandi.mandi?.stateHi})\n` +
      `दैनिक आवक: ${bestMandi.arrivalQuintals || 350} क्विंटल\n` +
      `व्यापारी: ${bestMandi.merchantName} (${bestMandi.merchantContact})\n` +
      `सत्यापित: e-NAM एवं कृषि सेतु नेटवर्क\n` +
      `मेड बाय कोर टाइटन`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-linear-to-r from-zinc-900 via-zinc-800 to-emerald-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-zinc-700/60 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
        <div className="space-y-2.5">
          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'hi' ? 'सर्वोच्च बोली मंडी' : 'Highest Bidder APMC'}</span>
            </span>

            <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-300 border border-zinc-700 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>e-NAM Verified</span>
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === 'hi' ? 'आज खुली है' : 'Market Open'}</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {language === 'hi'
              ? `${bestMandi.mandi?.nameHi} (${bestMandi.mandi?.cityHi}) में ${selectedCrop.nameHi} का अधिकतम भाव`
              : `Top Rate for ${selectedCrop.nameEn} at ${bestMandi.mandi?.nameEn} (${bestMandi.mandi?.cityEn})`}
          </h2>

          <p className="text-zinc-300 text-xs sm:text-sm max-w-xl">
            {isSevere
              ? language === 'hi'
                ? 'आवक में तीव्र कमी दर्ज — स्थानीय आढ़ती एवं व्यापारी प्रीमियम भाव पर तत्काल खरीद कर रहे हैं।'
                : 'Acute deficit reported — Local merchants procuring at significant premium rates.'
              : language === 'hi'
              ? `दैनिक आवक लगभग ${bestMandi.arrivalQuintals || 450} क्विंटल है और व्यापारिक मांग तेज बनी हुई है।`
              : `Daily arrival around ${bestMandi.arrivalQuintals || 450} quintals with steady buyer inquiries.`}
          </p>

          {/* Quick WhatsApp Share Action */}
          <div className="pt-1">
            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Share on WhatsApp'}</span>
            </button>
          </div>
        </div>

        {/* Price Card */}
        <div className="bg-white text-zinc-900 rounded-2xl p-4 sm:p-5 shrink-0 text-center sm:text-right border border-zinc-200 shadow-lg min-w-[200px]">
          <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
            {language === 'hi' ? 'थोक खरीद भाव (बोली)' : 'Wholesale Procurement'}
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-800 tracking-tight my-0.5">
            ₹{bestMandi.wholesalePrice}
            <span className="text-xs font-medium text-zinc-500 ml-1">
              /{language === 'hi' ? selectedCrop.unitHi : selectedCrop.unitEn}
            </span>
          </div>

          {bestMandi.priceTrend && (
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 mb-1">
              <span>▲ +₹{bestMandi.priceTrend.change} (+{bestMandi.priceTrend.percent}%)</span>
              <span>{language === 'hi' ? 'तेजी' : 'Bullish'}</span>
            </div>
          )}

          <div className="text-xs text-zinc-600 font-medium flex items-center justify-center sm:justify-end gap-1 pt-1 border-t border-zinc-100">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>
              {language === 'hi' ? bestMandi.mandi?.cityHi : bestMandi.mandi?.cityEn} • {bestMandi.mandi?.distanceKm} km
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
