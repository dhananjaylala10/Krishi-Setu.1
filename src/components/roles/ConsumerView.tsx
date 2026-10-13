import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CROPS, MANDIS } from '../../data/mockData';
import { Search, ShoppingBasket } from 'lucide-react';
import { CropCategoryFilter } from '../shared/CropCategoryFilter';
import { CheapestDealBanner } from './consumer/CheapestDealBanner';
import { ConsumerMandiCard } from './consumer/ConsumerMandiCard';

export const ConsumerView: React.FC = () => {
  const { marketItems, language, selectedState, selectedCity, selectedMandi, searchLocationQuery } = useApp();
  const [selectedCropId, setSelectedCropId] = useState<string>('crop-potato');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedCrop = useMemo(() => {
    return CROPS.find((c) => c.id === selectedCropId) || CROPS[1];
  }, [selectedCropId]);

  // Mandis offering this crop
  const mandiOfferings = useMemo(() => {
    return marketItems
      .filter((item) => item.cropId === selectedCropId)
      .map((item) => ({
        ...item,
        mandi: MANDIS.find((m) => m.id === item.mandiId),
      }))
      .filter((entry) => {
        if (selectedState !== 'all' && entry.mandi?.stateEn !== selectedState) return false;
        if (selectedCity !== 'all' && entry.mandi?.cityEn !== selectedCity) return false;
        if (selectedMandi !== 'all' && entry.mandi?.id !== selectedMandi) return false;

        const terms = [searchQuery.trim(), searchLocationQuery.trim()].filter(Boolean);
        if (terms.length === 0) return true;

        return terms.every((term) => {
          const q = term.toLowerCase();
          return (
            entry.mandi?.cityHi.toLowerCase().includes(q) ||
            entry.mandi?.cityEn.toLowerCase().includes(q) ||
            entry.mandi?.nameHi.toLowerCase().includes(q) ||
            entry.mandi?.nameEn.toLowerCase().includes(q) ||
            entry.mandi?.stateHi.toLowerCase().includes(q) ||
            entry.mandi?.stateEn.toLowerCase().includes(q)
          );
        });
      })
      .sort((a, b) => a.retailPrice - b.retailPrice); // Lowest consumer price first
  }, [marketItems, selectedCropId, searchQuery, selectedState, selectedCity, selectedMandi, searchLocationQuery]);

  const cheapestMandi = mandiOfferings[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-7">
      {/* Header - Human-Crafted Startup Copy */}
      <div className="bg-zinc-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-zinc-800">
        <div className="flex items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShoppingBasket className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'उपभोक्ता थोक व खुदरा मूल्य खोज' : 'Consumer Mandi Price Finder'}</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {language === 'hi'
            ? 'मंडीवार जिंस उपलब्धता एवं उचित खुदरा मूल्य'
            : 'Mandi Stock Availability & Fair Retail Benchmark Rates'}
        </h1>
        <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-2xl">
          {language === 'hi'
            ? 'स्थानीय कृषि मंडियों में ताजी सब्जियों एवं अनाजों की लाइव आवक, स्टॉक उपलब्धता और उचित खुदरा दरों की पारदर्शी तुलना।'
            : 'Transparent real-time tracking of fresh produce availability and fair retail shelf rates across nearby APMC mandis.'}
        </p>
      </div>

      {/* Select Crop with Categories and Search */}
      <CropCategoryFilter
        selectedCropId={selectedCropId}
        onSelectCrop={setSelectedCropId}
        language={language}
        themeColor="teal"
        title={language === 'hi' ? 'आवश्यक जिंस अथवा सब्जी चुनें:' : 'Select Commodity / Fresh Produce:'}
        subtitle={language === 'hi' ? `कुल ${CROPS.length} जिंस उपलब्ध हैं` : `${CROPS.length} items listed`}
      />

      {/* Search Filter Box */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            language === 'hi'
              ? `शहर अथवा मंडी के नाम से खोजें (जैसे लखनऊ, कानपुर, आगरा, इंदौर)...`
              : `Search by city or mandi name (e.g. Lucknow, Kanpur, Agra, Indore)...`
          }
          className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 shadow-2xs text-zinc-900"
        />
      </div>

      {/* Fair Price Best Value Banner */}
      <CheapestDealBanner
        cheapestMandi={cheapestMandi}
        selectedCrop={selectedCrop}
        language={language}
      />

      {/* Mandi Cards List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-zinc-900">
            {language === 'hi'
              ? `${selectedCrop.nameHi} — मंडीवार उपलब्धता एवं दर सूची:`
              : `${selectedCrop.nameEn} — Mandi Availability & Rates:`}
          </h2>
          <span className="text-xs text-zinc-500 font-medium">
            {language === 'hi' ? `${mandiOfferings.length} मंडियां उपलब्ध` : `${mandiOfferings.length} mandis found`}
          </span>
        </div>

        {mandiOfferings.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-zinc-300 rounded-2xl p-8 text-center space-y-2">
            <span className="text-3xl block">🔍</span>
            <p className="font-bold text-zinc-800 text-sm">
              {language === 'hi' ? 'इस खोज या स्थान के लिए कोई मंडी नहीं मिली।' : 'No mandis found matching your search or location.'}
            </p>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              {language === 'hi'
                ? 'कृपया ऊपर से राज्य/शहर बदलें या खोज शब्द साफ करें।'
                : 'Try clearing your search query or changing the state/city in the top bar.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mandiOfferings.map((item, index) => (
              <ConsumerMandiCard
                key={item.id}
                item={item}
                selectedCrop={selectedCrop}
                isBest={index === 0}
                language={language}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
