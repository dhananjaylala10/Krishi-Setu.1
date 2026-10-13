import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MANDIS } from '../../data/mockData';
import { GovtMetricsGrid } from './govt/GovtMetricsGrid';
import { GovtInterventionPanel } from './govt/GovtInterventionPanel';
import { GovtRegistryTable } from './govt/GovtRegistryTable';
import { GovtNoticesList } from './govt/GovtNoticesList';
import { Landmark } from 'lucide-react';

export const GovtView: React.FC = () => {
  const {
    marketItems,
    govtNotices,
    releaseBufferStock,
    language,
    selectedState,
    selectedCity,
    selectedMandi,
    searchLocationQuery,
  } = useApp();
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');

  const locationFilteredItems = useMemo(() => {
    return marketItems.filter((item) => {
      const mandi = MANDIS.find((m) => m.id === item.mandiId);
      if (!mandi) return false;
      if (selectedState !== 'all' && mandi.stateEn !== selectedState) return false;
      if (selectedCity !== 'all' && mandi.cityEn !== selectedCity) return false;
      if (selectedMandi !== 'all' && mandi.id !== selectedMandi) return false;
      if (!searchLocationQuery.trim()) return true;
      const q = searchLocationQuery.trim().toLowerCase();
      return (
        mandi.cityHi.toLowerCase().includes(q) ||
        mandi.cityEn.toLowerCase().includes(q) ||
        mandi.nameHi.toLowerCase().includes(q) ||
        mandi.nameEn.toLowerCase().includes(q) ||
        mandi.stateHi.toLowerCase().includes(q) ||
        mandi.stateEn.toLowerCase().includes(q)
      );
    });
  }, [marketItems, selectedState, selectedCity, selectedMandi, searchLocationQuery]);

  // Shortage items
  const shortageItems = locationFilteredItems.filter(
    (item) => item.stockStatus === 'severe_shortage' || item.stockStatus === 'low'
  );

  const severeItems = locationFilteredItems.filter((item) => item.stockStatus === 'severe_shortage');

  const filteredItems = locationFilteredItems.filter((item) => {
    if (selectedCropFilter === 'all') return true;
    return item.cropId === selectedCropFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-7">
      {/* Header - Price Monitoring Division (PMD) */}
      <div className="bg-zinc-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-zinc-800">
        <div className="flex items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'मूल्य निगरानी एवं खाद्य आपूर्ति सेल' : 'Price Monitoring Division (PMD)'}</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {language === 'hi'
            ? 'राष्ट्रीय कृषि आपूर्ति एवं बाजार स्थिरीकरण डैशबोर्ड'
            : 'National Food Inflow Surveillance & Price Stability Dashboard'}
        </h1>
        <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-2xl">
          {language === 'hi'
            ? 'देशभर की एपीएमसी मंडियों में जिंस आवक, आपूर्ति अंतराल (Deficit) और असामान्य मूल्य वृद्धि की रियल-टाइम निगरानी एवं हस्तक्षेप।'
            : 'Real-time surveillance of commodity inflows, localized shortages, and market interventions across Indian APMC nodes.'}
        </p>
      </div>

      {/* 4 Big KPI Metric Cards */}
      <GovtMetricsGrid
        severeCount={severeItems.length}
        lowStockCount={shortageItems.length - severeItems.length}
        balancedCount={marketItems.length - shortageItems.length}
        activeMandisCount={MANDIS.length}
        language={language}
      />

      {/* Critical Shortages Action Box (Interactive Government Intervention!) */}
      <GovtInterventionPanel
        severeItems={severeItems}
        language={language}
        onReleaseBufferStock={releaseBufferStock}
      />

      {/* State & Mandi Overview Table */}
      <GovtRegistryTable
        items={filteredItems}
        selectedCropFilter={selectedCropFilter}
        onCropFilterChange={setSelectedCropFilter}
        language={language}
      />

      {/* Government Advisories and Directives */}
      <GovtNoticesList govtNotices={govtNotices} language={language} />
    </div>
  );
};
