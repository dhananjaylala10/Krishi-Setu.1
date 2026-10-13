import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CROPS, MANDIS } from '../../data/mockData';
import { PlusCircle, TrendingUp } from 'lucide-react';
import { CropCategoryFilter } from '../shared/CropCategoryFilter';
import { WeatherAdvisoryBar } from '../shared/WeatherAdvisoryBar';
import { DigitalMandiSlipModal, type MandiSlipData } from '../shared/DigitalMandiSlipModal';
import { FarmerListingModal } from './farmer/FarmerListingModal';
import { BestMandiCard } from './farmer/BestMandiCard';
import { MandiRateCard } from './farmer/MandiRateCard';
import { ProfitCalculator } from './farmer/ProfitCalculator';
import type { QualityGrade, MarketItem, Mandi } from '../../types';

export const FarmerView: React.FC = () => {
  const {
    marketItems,
    language,
    addFarmerListing,
    selectedState,
    selectedCity,
    selectedMandi,
    searchLocationQuery,
  } = useApp();

  const [selectedCropId, setSelectedCropId] = useState<string>('crop-tomato');
  const [showListingForm, setShowListingForm] = useState<boolean>(false);
  const [slipModalOpen, setSlipModalOpen] = useState<boolean>(false);
  const [activeSlipData, setActiveSlipData] = useState<MandiSlipData | null>(null);

  const selectedCrop = useMemo(() => {
    return CROPS.find((c) => c.id === selectedCropId) || CROPS[0];
  }, [selectedCropId]);

  // Find all mandis having this crop (filtered by selected State, City and Mandi)
  const mandiRates = useMemo(() => {
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
        if (!searchLocationQuery.trim()) return true;

        const q = searchLocationQuery.trim().toLowerCase();
        return (
          entry.mandi?.cityHi.toLowerCase().includes(q) ||
          entry.mandi?.cityEn.toLowerCase().includes(q) ||
          entry.mandi?.nameHi.toLowerCase().includes(q) ||
          entry.mandi?.nameEn.toLowerCase().includes(q) ||
          entry.mandi?.stateHi.toLowerCase().includes(q) ||
          entry.mandi?.stateEn.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.wholesalePrice - a.wholesalePrice); // Best price first
  }, [marketItems, selectedCropId, selectedState, selectedCity, selectedMandi, searchLocationQuery]);

  const bestMandi = mandiRates[0];

  const handleOpenSlipFromCard = (item: MarketItem & { mandi?: Mandi }) => {
    if (!item.mandi) return;
    const qty = 1000;
    const gross = qty * item.wholesalePrice;
    const freight = Math.round(500 + item.mandi.distanceKm * 18);
    const cess = Math.round((gross * 1.5) / 100);
    const net = gross - freight - cess;

    setActiveSlipData({
      farmerName: 'किसान बंधु',
      farmerContact: '+91 98XXX XXXXX',
      crop: selectedCrop,
      mandi: item.mandi,
      quantityKg: qty,
      ratePerKg: item.wholesalePrice,
      grade: 'A',
      grossAmount: gross,
      freightCost: freight,
      apmcCess: cess,
      netPayout: net,
      merchantName: item.merchantName,
      date: 'आज / Live',
    });
    setSlipModalOpen(true);
  };

  const handleOpenSlipFromCalculator = (calcData: {
    quantityKg: number;
    grade: QualityGrade;
    ratePerKg: number;
    grossAmount: number;
    freightCost: number;
    apmcCess: number;
    netPayout: number;
  }) => {
    const targetMandi = bestMandi?.mandi || MANDIS[0];
    setActiveSlipData({
      farmerName: 'किसान बंधु',
      farmerContact: '+91 98XXX XXXXX',
      crop: selectedCrop,
      mandi: targetMandi,
      quantityKg: calcData.quantityKg,
      ratePerKg: calcData.ratePerKg,
      grade: calcData.grade,
      grossAmount: calcData.grossAmount,
      freightCost: calcData.freightCost,
      apmcCess: calcData.apmcCess,
      netPayout: calcData.netPayout,
      merchantName: bestMandi?.merchantName || 'आढ़त व्यापार केंद्र',
      date: 'आज / Live',
    });
    setSlipModalOpen(true);
  };

  const activeLocationLabel = useMemo(() => {
    if (selectedMandi !== 'all') {
      const m = MANDIS.find((item) => item.id === selectedMandi);
      if (m) return m.cityEn;
    }
    if (selectedCity !== 'all') return selectedCity;
    if (selectedState !== 'all') return selectedState;
    return 'Lucknow';
  }, [selectedMandi, selectedCity, selectedState]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-7">
      {/* Weather & Harvest Logistics Bulletin */}
      <WeatherAdvisoryBar locationName={activeLocationLabel} language={language} />

      {/* Header Banner - Human-Crafted Startup Copy */}
      <div className="bg-zinc-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>🌾</span>
              <span>{language === 'hi' ? 'एपीएमसी किसान सुविधा डेस्क' : 'APMC Farmer Intelligence Desk'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
              {language === 'hi'
                ? 'लाइव मंडी भाव, आवक एवं मांग विश्लेषण'
                : 'Live Mandi Inflow, Rates & Deficit Surveillance'}
            </h1>
            <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-2xl">
              {language === 'hi'
                ? 'जिन कृषि मंडियों में तात्कालिक कमी (Shortage) दर्ज है, वहाँ आढ़ती उच्चतम प्रीमियम भाव पर सीधी खरीद कर रहे हैं।'
                : 'Mandis reporting acute inventory shortages offer the highest procurement bids for your harvest.'}
            </p>
          </div>

          <button
            onClick={() => setShowListingForm(!showListingForm)}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl shadow-xs transition-all shrink-0 text-sm cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{language === 'hi' ? 'फसल बिक्री दर्ज करें' : 'Post Produce Lot'}</span>
          </button>
        </div>
      </div>

      {/* Produce Listing Form Modal */}
      <FarmerListingModal
        isOpen={showListingForm}
        onClose={() => setShowListingForm(false)}
        selectedCrop={selectedCrop}
        language={language}
        onSubmit={(data) => addFarmerListing({ ...data, cropId: selectedCropId })}
      />

      {/* Step 1: Commodity & Variety Selector */}
      <CropCategoryFilter
        selectedCropId={selectedCropId}
        onSelectCrop={setSelectedCropId}
        language={language}
        themeColor="emerald"
      />

      {/* Highest Bidder APMC Recommendation Banner */}
      <BestMandiCard
        bestMandi={bestMandi}
        selectedCrop={selectedCrop}
        language={language}
      />

      {/* Step 2: Mandi Comparison Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg sm:text-xl font-black text-zinc-900">
              {language === 'hi' ? 'सभी मंडियों के लाइव भाव एवं आवक स्थिति' : 'All Mandi Rates & Inflow Registry'}
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-medium">
            {language === 'hi' ? `कुल ${mandiRates.length} मंडियां सूचीबद्ध` : `${mandiRates.length} mandis listed`}
          </span>
        </div>

        {mandiRates.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-zinc-300 p-8 text-center space-y-3">
            <span className="text-3xl block">🔍</span>
            <h3 className="text-base font-bold text-zinc-800">
              {language === 'hi'
                ? 'चयनित स्थान या फ़िल्टर के लिए कोई मंडी रिकॉर्ड नहीं मिला'
                : 'No mandis found matching current location filter'}
            </h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              {language === 'hi'
                ? 'कृपया ऊपर दिए गए लोकेशन बार से दूसरा राज्य/शहर चुनें या फ़िल्टर साफ़ करें।'
                : 'Please select a different State/City from the top bar or clear the location filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mandiRates.map((item) => (
              <MandiRateCard
                key={item.id}
                item={item}
                selectedCrop={selectedCrop}
                language={language}
                onOpenMandiSlip={handleOpenSlipFromCard}
              />
            ))}
          </div>
        )}
      </div>

      {/* Step 3: Logistics & Net Profit Calculator */}
      <ProfitCalculator
        bestMandi={bestMandi}
        selectedCrop={selectedCrop}
        language={language}
        onOpenMandiSlip={handleOpenSlipFromCalculator}
      />

      {/* Digital Mandi Sale Voucher Modal */}
      <DigitalMandiSlipModal
        isOpen={slipModalOpen}
        onClose={() => setSlipModalOpen(false)}
        data={activeSlipData}
        language={language}
      />
    </div>
  );
};
