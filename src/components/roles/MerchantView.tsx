import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MANDIS, CROPS } from '../../data/mockData';
import { Store, Search, Activity } from 'lucide-react';
import { MerchantCropCard } from './merchant/MerchantCropCard';
import { FarmerOffersList } from './merchant/FarmerOffersList';
import { WeatherAdvisoryBar } from '../shared/WeatherAdvisoryBar';

export const MerchantView: React.FC = () => {
  const {
    marketItems,
    updateMarketItem,
    farmerListings,
    language,
    selectedState,
    selectedCity,
    selectedMandi: globalSelectedMandi,
    setSelectedMandi: setGlobalSelectedMandi,
    searchLocationQuery,
  } = useApp();

  const filteredMandis = useMemo(() => {
    const list = MANDIS.filter((m) => {
      if (selectedState !== 'all' && m.stateEn !== selectedState) return false;
      if (selectedCity !== 'all' && m.cityEn !== selectedCity) return false;
      if (globalSelectedMandi !== 'all' && m.id !== globalSelectedMandi) return false;
      if (!searchLocationQuery.trim()) return true;
      const q = searchLocationQuery.trim().toLowerCase();
      return (
        m.cityHi.toLowerCase().includes(q) ||
        m.cityEn.toLowerCase().includes(q) ||
        m.nameHi.toLowerCase().includes(q) ||
        m.nameEn.toLowerCase().includes(q) ||
        m.stateHi.toLowerCase().includes(q) ||
        m.stateEn.toLowerCase().includes(q)
      );
    });
    return list.length > 0 ? list : MANDIS;
  }, [selectedState, selectedCity, globalSelectedMandi, searchLocationQuery]);

  const [localMandiId, setLocalMandiId] = useState<string>('');

  const activeMandiId = useMemo(() => {
    if (globalSelectedMandi !== 'all' && MANDIS.some((m) => m.id === globalSelectedMandi)) {
      return globalSelectedMandi;
    }
    if (localMandiId && filteredMandis.some((m) => m.id === localMandiId)) {
      return localMandiId;
    }
    return filteredMandis[0]?.id || MANDIS[0]?.id;
  }, [globalSelectedMandi, localMandiId, filteredMandis]);

  const selectedMandi = MANDIS.find((m) => m.id === activeMandiId) || MANDIS[0];

  // Items for the selected mandi
  const mandiItems = marketItems.filter((item) => item.mandiId === activeMandiId);

  const [merchantCropCat, setMerchantCropCat] = useState<string>('all');
  const [merchantCropSearch, setMerchantCropSearch] = useState<string>('');

  const displayMandiItems = useMemo(() => {
    return mandiItems.filter((item) => {
      const crop = CROPS.find((c) => c.id === item.cropId);
      if (!crop) return false;
      if (merchantCropCat === 'vegetable' && crop.category !== 'vegetable') return false;
      if (merchantCropCat === 'grain_pulse' && crop.category !== 'grain' && crop.category !== 'pulse') return false;
      if (merchantCropCat === 'spice' && crop.category !== 'spice') return false;
      if (merchantCropCat === 'fruit_cash' && crop.category !== 'fruit' && crop.category !== 'cash') return false;
      if (!merchantCropSearch.trim()) return true;
      const q = merchantCropSearch.trim().toLowerCase();
      return (
        crop.nameHi.toLowerCase().includes(q) ||
        crop.nameEn.toLowerCase().includes(q)
      );
    });
  }, [mandiItems, merchantCropCat, merchantCropSearch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-7">
      {/* Live Satellite Weather & Logistics Advisory */}
      <WeatherAdvisoryBar locationName={selectedMandi.cityEn} language={language} />

      {/* Header - Professional B2B Trading Desk */}
      <div className="bg-zinc-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'आढ़ती एवं थोक व्यापारी डेस्क' : 'APMC Commission Agent Trading Desk'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
              {language === 'hi'
                ? 'मंडी आवक, बोली दरें एवं स्टॉक प्रबंधन'
                : 'Mandi Inflow, Bidding Desk & Shortage Broadcasting'}
            </h1>
            <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-2xl">
              {language === 'hi'
                ? 'जिस जिंस की मंडी में कमी हो, उसे "अति-मांग" चिह्नित करें। इससे पूरे क्षेत्र के कृषकों को तुरंत माल भेजने का सिग्नल प्रसारित होगा।'
                : 'Broadcast inventory deficits to notify regional growers and channelize arrivals directly to your trade lot.'}
            </p>
          </div>

          <div className="bg-zinc-800/80 px-4 py-3 rounded-xl border border-zinc-700 text-right shrink-0">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">सक्रिय व्यापार केंद्र</span>
            <span className="text-sm font-extrabold text-amber-400 block">{selectedMandi.nameHi}</span>
            <span className="text-xs text-zinc-400">{selectedMandi.cityHi}, {selectedMandi.stateHi}</span>
          </div>
        </div>
      </div>

      {/* Mandi Selector */}
      <div className="space-y-3 bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label htmlFor="merchant-mandi-select" className="block text-sm sm:text-base font-extrabold text-zinc-900">
              📍 {language === 'hi' ? 'व्यापारिक मंडी एवं शहर चयन:' : 'Select Mandi & Trade Center:'}
            </label>
            <p className="text-xs text-zinc-500">
              {language === 'hi'
                ? `कुल ${filteredMandis.length} एपीएमसी मंडियां उपलब्ध हैं`
                : `${filteredMandis.length} mandis available`}
            </p>
          </div>

          {/* Searchable Select Dropdown */}
          <div className="w-full sm:w-80">
            <select
              id="merchant-mandi-select"
              value={activeMandiId}
              onChange={(e) => {
                setLocalMandiId(e.target.value);
                setGlobalSelectedMandi(e.target.value);
              }}
              className="w-full font-bold text-xs sm:text-sm bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2.5 text-zinc-900 focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {filteredMandis.map((m) => (
                <option key={m.id} value={m.id}>
                  {language === 'hi'
                    ? `${m.cityHi} - ${m.nameHi} (${m.stateHi})`
                    : `${m.cityEn} - ${m.nameEn} (${m.stateEn})`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick select pills */}
        <div className="pt-2 border-t border-zinc-100">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            {language === 'hi' ? 'त्वरित मंडी पहुंच (Quick Select):' : 'Quick Access:'}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {filteredMandis.slice(0, 6).map((m) => {
              const isSelected = activeMandiId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setLocalMandiId(m.id);
                    setGlobalSelectedMandi(m.id);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                      : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                  }`}
                >
                  <div className="font-extrabold text-xs">{language === 'hi' ? m.cityHi : m.cityEn}</div>
                  <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {language === 'hi' ? m.nameHi : m.nameEn}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stock & Rate Management Table/Cards */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-zinc-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-600" />
              <span>
                {language === 'hi'
                  ? `${selectedMandi.nameHi}: जिंस आवक एवं बोली दरें`
                  : `${selectedMandi.nameEn}: Commodity Inflow & Bid Desk`}
              </span>
            </h2>
            <p className="text-xs text-zinc-500">
              {language === 'hi'
                ? 'नीचे दिए गए बटनों से तुरंत स्टॉक स्तर अपडेट करें और थोक बोली संशोधित करें:'
                : 'Click status pills to broadcast real-time stock levels and edit procurement bids:'}
            </p>
          </div>
          <span className="text-xs bg-zinc-100 text-zinc-700 font-bold px-3 py-1 rounded-full border border-zinc-200">
            {selectedMandi.cityHi}
          </span>
        </div>

        {/* Filter & Search Bar for Merchant Crops */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-zinc-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', labelHi: `सभी (${mandiItems.length})`, labelEn: `All (${mandiItems.length})` },
              { id: 'vegetable', labelHi: `सब्जियां`, labelEn: `Veg` },
              { id: 'grain_pulse', labelHi: `अनाज व दालें`, labelEn: `Grains` },
              { id: 'spice', labelHi: `मसाले`, labelEn: `Spices` },
              { id: 'fruit_cash', labelHi: `फल व नकदी`, labelEn: `Fruits & Cash` },
            ].map((cat) => {
              const isActive = merchantCropCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setMerchantCropCat(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200/50'
                  }`}
                >
                  {language === 'hi' ? cat.labelHi : cat.labelEn}
                </button>
              );
            })}
          </div>

          <div className="w-full sm:w-64 relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={merchantCropSearch}
              onChange={(e) => setMerchantCropSearch(e.target.value)}
              placeholder={language === 'hi' ? 'जिंस खोजें...' : 'Search commodity...'}
              className="w-full pl-8 pr-6 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white text-zinc-900"
            />
            {merchantCropSearch && (
              <button
                onClick={() => setMerchantCropSearch('')}
                className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {displayMandiItems.map((item) => (
            <MerchantCropCard
              key={item.id}
              item={item}
              crop={CROPS.find((c) => c.id === item.cropId)}
              language={language}
              onUpdateStatus={(newStatus) => updateMarketItem(item.mandiId, item.cropId, newStatus)}
              onSavePrices={(wholesale, retail) =>
                updateMarketItem(item.mandiId, item.cropId, item.stockStatus, wholesale, retail)
              }
            />
          ))}
        </div>
      </div>

      {/* Section: Incoming Farmer Offers */}
      <FarmerOffersList farmerListings={farmerListings} language={language} />
    </div>
  );
};
