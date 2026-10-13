import React from 'react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';
import { Sprout, Store, Landmark, ShoppingBasket, Languages, RotateCcw, Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, language, setLanguage, resetAllData } = useApp();

  const roles: { id: UserRole; labelHi: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'farmer',
      labelHi: 'किसान पोर्टल',
      labelEn: 'Farmer Portal',
      icon: <Sprout className="w-4 h-4" />,
    },
    {
      id: 'merchant',
      labelHi: 'मर्चेंट / आढ़त डेस्क',
      labelEn: 'Merchant Desk',
      icon: <Store className="w-4 h-4" />,
    },
    {
      id: 'govt',
      labelHi: 'सरकारी निगरानी सेल',
      labelEn: 'Govt Surveillance',
      icon: <Landmark className="w-4 h-4" />,
    },
    {
      id: 'consumer',
      labelHi: 'उपभोक्ता बाजार खोज',
      labelEn: 'Consumer Rates',
      icon: <ShoppingBasket className="w-4 h-4" />,
    },
  ];

  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-30 shadow-2xs">
      {/* Top utility row */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-bold text-xl shadow-xs ring-2 ring-emerald-500/20">
            🌾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                KRISHI SETU
              </span>
              <span className="text-[11px] bg-emerald-50 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">
                {language === 'hi' ? 'कृषि सेतु' : 'Agri Platform'}
              </span>
            </div>
            <p className="text-xs text-zinc-500 hidden sm:flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>
                {language === 'hi'
                  ? 'अखिल भारतीय एपीएमसी एवं ई-नाम लाइव मार्केटप्लेस'
                  : 'Pan-India APMC & e-NAM Live Marketplace'}
              </span>
            </p>
          </div>
        </div>

        {/* Live sync badge & Language / Reset Controls */}
        <div className="flex items-center gap-2">
          {/* Live indicator chip */}
          <div className="hidden lg:flex items-center gap-1.5 bg-zinc-50 text-zinc-600 text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 font-medium">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'hi' ? 'एपीएमसी लाइव सिंक' : 'APMC Live Sync'}</span>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg text-xs sm:text-sm font-semibold transition-colors border border-zinc-200 cursor-pointer"
            title="भाषा बदलें / Change Language"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={() => {
              if (window.confirm(language === 'hi' ? 'क्या आप शुरुआती डेटा रीसेट करना चाहते हैं?' : 'Reset demo data?')) {
                resetAllData();
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-xs transition-colors border border-zinc-200 cursor-pointer"
            title="रीसेट डेटा / Reset Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{language === 'hi' ? 'रीसेट' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Role Navigation Bar (Fintech-grade Segmented Tabs) */}
      <div className="bg-zinc-50/80 border-t border-zinc-200/80 px-3 sm:px-6 py-1.5">
        <div className="max-w-6xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {roles.map((r) => {
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/80'
                }`}
              >
                <span className={isActive ? 'text-emerald-400' : 'text-zinc-500'}>
                  {r.icon}
                </span>
                <span>{language === 'hi' ? r.labelHi : r.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
