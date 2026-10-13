import React from 'react';
import type { MarketItem, Language } from '../../../types';
import { MANDIS, CROPS } from '../../../data/mockData';
import { Truck, ShieldAlert } from 'lucide-react';

interface GovtInterventionPanelProps {
  severeItems: MarketItem[];
  language: Language;
  onReleaseBufferStock: (mandiId: string, cropId: string) => void;
}

export const GovtInterventionPanel: React.FC<GovtInterventionPanelProps> = ({
  severeItems,
  language,
  onReleaseBufferStock,
}) => {
  if (severeItems.length === 0) return null;

  return (
    <div className="bg-rose-50/70 border border-rose-300 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
          <ShieldAlert className="w-5 h-5 text-rose-700" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-rose-950">
              {language === 'hi'
                ? 'मूल्य स्थिरीकरण हस्तक्षेप डेस्क (Price Stabilization Fund - PSF)'
                : 'Market Intervention & Price Stabilization Trigger'}
            </h2>
            <span className="text-[10px] bg-rose-600 text-white font-extrabold px-2 py-0.5 rounded-full uppercase">
              Urgent
            </span>
          </div>
          <p className="text-xs sm:text-sm text-rose-800 mt-0.5">
            {language === 'hi'
              ? 'आढ़तियों द्वारा गंभीर जिंस कमी दर्ज की गई है। उपभोक्ता दरों को स्थिर रखने हेतु बफर स्टॉक रिलीज का आदेश जारी करें:'
              : 'Acute supply deficits reported by traders. Dispatch government buffer stocks to curb abnormal price escalation:'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {severeItems.map((item) => {
          const mandi = MANDIS.find((m) => m.id === item.mandiId);
          const crop = CROPS.find((c) => c.id === item.cropId);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-rose-200 p-4 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-1.5 bg-rose-50 rounded-xl border border-rose-100">{crop?.icon}</span>
                    <div>
                      <h3 className="font-black text-base text-zinc-900">
                        {language === 'hi' ? crop?.nameHi : crop?.nameEn} — {language === 'hi' ? mandi?.cityHi : mandi?.cityEn}
                      </h3>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        {mandi?.nameHi} • APMC-{mandi?.stateEn.slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 text-xs flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                      <span>{language === 'hi' ? 'गंभीर किल्लत' : 'Acute Deficit'}</span>
                    </span>
                    <span className="text-zinc-600 font-medium">
                      थोक: ₹{item.wholesalePrice} | खुदरा: ₹{item.retailPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                <span className="text-xs text-zinc-500 font-medium">
                  {language === 'hi' ? 'नीतिगत कार्रवाई:' : 'Action Protocol:'}
                </span>
                <button
                  onClick={() => onReleaseBufferStock(item.mandiId, item.cropId)}
                  className="bg-rose-700 hover:bg-rose-800 text-white text-xs font-black px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>
                    {language === 'hi'
                      ? '15,000 किग्रा बफर स्टॉक छोड़ें'
                      : 'Release 15,000kg Buffer Stock'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
