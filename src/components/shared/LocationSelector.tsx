import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MANDIS } from '../../data/mockData';
import { MapPin, Search, X } from 'lucide-react';

export const LocationSelector: React.FC = () => {
  const {
    language,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    selectedMandi,
    setSelectedMandi,
    selectMandiDirectly,
    searchLocationQuery,
    setSearchLocationQuery,
  } = useApp();

  // Extract unique states with localized names (sorted alphabetically)
  const availableStates = useMemo(() => {
    const stateMap = new Map<string, { en: string; hi: string }>();
    MANDIS.forEach((m) => {
      if (!stateMap.has(m.stateEn)) {
        stateMap.set(m.stateEn, { en: m.stateEn, hi: m.stateHi });
      }
    });
    return Array.from(stateMap.values()).sort((a, b) => a.en.localeCompare(b.en));
  }, []);

  // Extract cities based on selected state (sorted alphabetically)
  const availableCities = useMemo(() => {
    const cityMap = new Map<string, { en: string; hi: string }>();
    MANDIS.filter(
      (m) => selectedState === 'all' || m.stateEn === selectedState
    ).forEach((m) => {
      if (!cityMap.has(m.cityEn)) {
        cityMap.set(m.cityEn, { en: m.cityEn, hi: m.cityHi });
      }
    });
    return Array.from(cityMap.values()).sort((a, b) => a.en.localeCompare(b.en));
  }, [selectedState]);

  // Extract mandis based on selected state and city
  const availableMandis = useMemo(() => {
    return MANDIS.filter((m) => {
      if (selectedState !== 'all' && m.stateEn !== selectedState) return false;
      if (selectedCity !== 'all' && m.cityEn !== selectedCity) return false;
      return true;
    }).sort((a, b) => a.nameEn.localeCompare(b.nameEn));
  }, [selectedState, selectedCity]);

  const activeMandiObj = useMemo(() => {
    return MANDIS.find((m) => m.id === selectedMandi);
  }, [selectedMandi]);

  const handleStateChange = (stateEn: string) => {
    setSelectedState(stateEn);
  };

  const handleCityChange = (cityEn: string) => {
    setSelectedCity(cityEn);
  };

  const handleMandiChange = (mandiId: string) => {
    selectMandiDirectly(mandiId);
  };

  const isFilterActive =
    selectedState !== 'all' ||
    selectedCity !== 'all' ||
    selectedMandi !== 'all' ||
    searchLocationQuery.trim().length > 0;

  const resetLocationFilter = () => {
    setSelectedState('all');
    setSelectedCity('all');
    setSelectedMandi('all');
    setSearchLocationQuery('');
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-2xs py-2.5 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Label & Active Status */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
              {language === 'hi' ? 'स्थान व मंडी खोज:' : 'Location & Mandi Selector:'}
            </span>
            <span className="text-sm font-extrabold text-gray-900 max-w-xs truncate block" title={activeMandiObj ? (language === 'hi' ? activeMandiObj.nameHi : activeMandiObj.nameEn) : ''}>
              {selectedMandi !== 'all' && activeMandiObj
                ? `${language === 'hi' ? activeMandiObj.nameHi : activeMandiObj.nameEn} (${selectedCity !== 'all' ? selectedCity : activeMandiObj.cityEn})`
                : selectedCity !== 'all'
                ? `${selectedCity}, ${selectedState !== 'all' ? selectedState : ''}`
                : selectedState !== 'all'
                ? selectedState
                : (language === 'hi' ? 'पूरा भारत (सभी राज्य, शहर व मंडियां)' : 'All India (All Mandis & Cities)')}
            </span>
          </div>
        </div>

        {/* Dropdowns & Search Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-2 flex-grow max-w-4xl">
          {/* State Dropdown */}
          <div className="w-full">
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-2 text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white truncate"
            >
              <option value="all">
                🇮🇳 {language === 'hi' ? 'सभी राज्य (All States)' : 'All States'}
              </option>
              {availableStates.map((st) => (
                <option key={st.en} value={st.en}>
                  {language === 'hi' ? st.hi : st.en}
                </option>
              ))}
            </select>
          </div>

          {/* City / District Dropdown */}
          <div className="w-full">
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-2 text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white truncate"
            >
              <option value="all">
                🏙️ {language === 'hi' ? 'सभी ज़िले / शहर (All Cities)' : 'All Cities'}
              </option>
              {availableCities.map((ct) => (
                <option key={ct.en} value={ct.en}>
                  {language === 'hi' ? ct.hi : ct.en}
                </option>
              ))}
            </select>
          </div>

          {/* Mandi Dropdown */}
          <div className="w-full">
            <select
              value={selectedMandi}
              onChange={(e) => handleMandiChange(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-2 text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white truncate"
            >
              <option value="all">
                🌾 {language === 'hi' ? 'सभी मंडियां (All Mandis)' : 'All Mandis'}
              </option>
              {availableMandis.map((m) => (
                <option key={m.id} value={m.id} title={language === 'hi' ? m.nameHi : m.nameEn}>
                  {language === 'hi' ? m.nameHi : m.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Search Input */}
          <div className="w-full relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3" />
            <input
              type="text"
              value={searchLocationQuery}
              onChange={(e) => setSearchLocationQuery(e.target.value)}
              placeholder={language === 'hi' ? 'मंडी या शहर खोजें...' : 'Search city or mandi...'}
              className="w-full pl-8 pr-7 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            {searchLocationQuery && (
              <button
                onClick={() => setSearchLocationQuery('')}
                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Reset Filter Button */}
        {isFilterActive && (
          <button
            onClick={resetLocationFilter}
            className="px-2.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 shrink-0 transition-colors flex items-center justify-center gap-1"
            title={language === 'hi' ? 'फ़िल्टर हटाएं' : 'Clear filter'}
          >
            <X className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'साफ़ करें' : 'Clear'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
