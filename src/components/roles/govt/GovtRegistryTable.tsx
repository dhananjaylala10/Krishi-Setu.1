import React from 'react';
import type { MarketItem, Language } from '../../../types';
import { MANDIS, CROPS } from '../../../data/mockData';
import { StockStatusBadge } from '../../shared/StockStatusBadge';

interface GovtRegistryTableProps {
  items: MarketItem[];
  selectedCropFilter: string;
  onCropFilterChange: (cropId: string) => void;
  language: Language;
}

export const GovtRegistryTable: React.FC<GovtRegistryTableProps> = ({
  items,
  selectedCropFilter,
  onCropFilterChange,
  language,
}) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-zinc-900">
            📊 {language === 'hi' ? 'समस्त मंडियों की लाइव आवक एवं भाव रजिस्ट्री' : 'National APMC Mandi Inflow & Price Registry'}
          </h2>
          <p className="text-xs text-zinc-500">
            {language === 'hi'
              ? 'खाद्य एवं नागरिक आपूर्ति विभाग — लाइव एपीएमसी डेटा सिंक'
              : 'Ministry of Consumer Affairs & Food Supplies Live Data Sync'}
          </p>
        </div>

        {/* Filter by Crop */}
        <div className="flex items-center gap-2">
          <label htmlFor="govt-crop-filter" className="text-xs font-bold text-zinc-600">
            {language === 'hi' ? 'जिंस:' : 'Commodity:'}
          </label>
          <select
            id="govt-crop-filter"
            value={selectedCropFilter}
            onChange={(e) => onCropFilterChange(e.target.value)}
            className="text-xs font-bold px-3 py-2 border border-zinc-300 rounded-xl bg-zinc-50 focus:ring-2 focus:ring-indigo-500 cursor-pointer text-zinc-900"
          >
            <option value="all">
              {language === 'hi' ? `🌱 सभी जिंस एवं सब्जियां (${CROPS.length})` : `🌱 All Commodities (${CROPS.length})`}
            </option>
            <optgroup label={language === 'hi' ? '🥬 सब्जियां (Vegetables)' : '🥬 Vegetables'}>
              {CROPS.filter((c) => c.category === 'vegetable').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {language === 'hi' ? c.nameHi : c.nameEn}
                </option>
              ))}
            </optgroup>
            <optgroup label={language === 'hi' ? '🌾 अनाज व खाद्यान्न (Grains)' : '🌾 Grains'}>
              {CROPS.filter((c) => c.category === 'grain').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {language === 'hi' ? c.nameHi : c.nameEn}
                </option>
              ))}
            </optgroup>
            <optgroup label={language === 'hi' ? '🫘 दालें व तिलहन (Pulses & Oilseeds)' : '🫘 Pulses & Oilseeds'}>
              {CROPS.filter((c) => c.category === 'pulse').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {language === 'hi' ? c.nameHi : c.nameEn}
                </option>
              ))}
            </optgroup>
            <optgroup label={language === 'hi' ? '🧄 मसाले (Spices)' : '🧄 Spices'}>
              {CROPS.filter((c) => c.category === 'spice').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {language === 'hi' ? c.nameHi : c.nameEn}
                </option>
              ))}
            </optgroup>
            <optgroup label={language === 'hi' ? '🍎 फल व नकदी (Fruits & Cash)' : '🍎 Fruits & Cash'}>
              {CROPS.filter((c) => c.category === 'fruit' || c.category === 'cash').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {language === 'hi' ? c.nameHi : c.nameEn}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-100/80 text-zinc-700 uppercase text-[11px] font-black border-y border-zinc-200">
            <tr>
              <th className="p-3">{language === 'hi' ? 'जिंस' : 'Commodity'}</th>
              <th className="p-3">{language === 'hi' ? 'शहर / मंडी' : 'Mandi Hub'}</th>
              <th className="p-3">{language === 'hi' ? 'राज्य' : 'State'}</th>
              <th className="p-3">{language === 'hi' ? 'दैनिक आवक' : 'Daily Inflow'}</th>
              <th className="p-3">{language === 'hi' ? 'थोक भाव' : 'Wholesale'}</th>
              <th className="p-3">{language === 'hi' ? 'खुदरा भाव' : 'Retail'}</th>
              <th className="p-3">{language === 'hi' ? 'आपूर्ति स्थिति' : 'Status'}</th>
              <th className="p-3">{language === 'hi' ? 'प्रशासनिक निर्देश' : 'Advisory'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 font-medium">
            {items.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-zinc-500 font-medium bg-zinc-50/50">
                  <span className="text-2xl block mb-1">🔍</span>
                  {language === 'hi'
                    ? 'चयनित स्थान या फ़िल्टर के लिए कोई मंडी रिकॉर्ड नहीं मिला।'
                    : 'No records found for current location or filter.'}
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const mandi = MANDIS.find((m) => m.id === item.mandiId);
                const crop = CROPS.find((c) => c.id === item.cropId);
                const isShortage = item.stockStatus === 'severe_shortage';
                const isLow = item.stockStatus === 'low';

                return (
                  <tr key={item.id} className="hover:bg-zinc-50 transition-colors text-xs">
                    <td className="p-3 font-bold text-zinc-900 flex items-center gap-2">
                      <span className="text-base">{crop?.icon}</span>
                      <span>{language === 'hi' ? crop?.nameHi : crop?.nameEn}</span>
                    </td>
                    <td className="p-3 text-zinc-800">
                      <div className="font-bold">{language === 'hi' ? mandi?.cityHi : mandi?.cityEn}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">{mandi?.nameHi.slice(0, 20)}</div>
                    </td>
                    <td className="p-3 text-zinc-600 font-medium">
                      {language === 'hi' ? mandi?.stateHi : mandi?.stateEn}
                    </td>
                    <td className="p-3 font-bold text-zinc-800">
                      {item.arrivalQuintals || 120} qtl
                    </td>
                    <td className="p-3 font-black text-emerald-800">₹{item.wholesalePrice}</td>
                    <td className="p-3 font-bold text-zinc-800">₹{item.retailPrice}</td>
                    <td className="p-3">
                      <StockStatusBadge status={item.stockStatus} language={language} />
                    </td>
                    <td className="p-3 text-[11px] text-zinc-600">
                      {isShortage
                        ? language === 'hi'
                          ? 'बफर स्टॉक अथवा विशेष रैक से आपूर्ति प्रेषण'
                          : 'Immediate buffer dispatch ordered'
                        : isLow
                        ? language === 'hi'
                          ? 'निकटवर्ती जिलों से आवक की निगरानी'
                          : 'Inter-district inflow monitored'
                        : language === 'hi'
                        ? 'सामान्य एवं संतुलित आपूर्ति'
                        : 'Normal supply chain'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
