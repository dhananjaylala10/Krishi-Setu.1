import React, { useState, useMemo } from 'react';
import type { Language, Crop } from '../../types';
import { CROPS } from '../../data/mockData';
import { CROP_CATEGORIES, matchesCropSearch } from '../../constants/categories';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

interface CropCategoryFilterProps {
  selectedCropId: string;
  onSelectCrop: (cropId: string) => void;
  language: Language;
  themeColor?: 'emerald' | 'teal' | 'amber';
  title?: string;
  subtitle?: string;
}

export const CropCategoryFilter: React.FC<CropCategoryFilterProps> = ({
  selectedCropId,
  onSelectCrop,
  language,
  title,
  subtitle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentCategory = useMemo(() => {
    return CROP_CATEGORIES.find((c) => c.id === selectedCategory) || CROP_CATEGORIES[0];
  }, [selectedCategory]);

  const filteredCrops = useMemo(() => {
    return CROPS.filter((crop) => {
      if (!currentCategory.filterFn(crop)) return false;
      return matchesCropSearch(crop, searchQuery);
    });
  }, [currentCategory, searchQuery]);

  const defaultTitle =
    language === 'hi'
      ? 'जिंस एवं किस्म चयन (Commodity Filter)'
      : 'Commodity & Variety Selection';

  const defaultSubtitle =
    language === 'hi'
      ? `कुल ${CROPS.length} एपीएमसी सूचीबद्ध फसलें एवं सब्जियां`
      : `${CROPS.length} APMC-listed commodities available`;

  return (
    <div className="space-y-3 bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-extrabold text-zinc-900">
              {title || defaultTitle}
            </label>
            <p className="text-xs text-zinc-500">
              {subtitle || defaultSubtitle}
            </p>
          </div>
        </div>

        {/* Quick Crop Search */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'जिंस खोजें (उदा: आलू, गेहूं, प्याज)...' : 'Search commodity (e.g. Potato, Wheat)...'}
            className="w-full pl-9 pr-7 py-2 text-xs sm:text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-zinc-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600 text-xs cursor-pointer"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CROP_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = CROPS.filter(cat.filterFn).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 border border-zinc-200/50'
              }`}
            >
              {language === 'hi' ? `${cat.labelHi} (${count})` : `${cat.labelEn} (${count})`}
            </button>
          );
        })}
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredCrops.map((c: Crop) => {
          const isSelected = selectedCropId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelectCrop(c.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/50 font-black shadow-xs'
                  : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800'
              }`}
            >
              {isSelected && (
                <span className="absolute top-1 right-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                </span>
              )}
              <span className="text-2xl sm:text-3xl mb-1">{c.icon}</span>
              <span className="font-bold text-xs sm:text-sm text-center line-clamp-1">
                {language === 'hi' ? c.nameHi : c.nameEn}
              </span>
              <span className="text-[10px] text-zinc-400 mt-0.5 font-medium">
                ₹{c.basePrice}{c.unitEn === 'per quintal' ? '/qtl' : '/kg'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
