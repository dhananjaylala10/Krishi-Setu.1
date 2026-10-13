import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useApp();

  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-800 mt-auto py-10 px-4">
      <div className="max-w-5xl mx-auto text-center space-y-5">
        {/* Krishi Setu Logo & Tagline */}
        <div className="flex items-center justify-center gap-2.5">
          <span className="text-2xl">🌾</span>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
            KRISHI SETU (कृषि सेतु)
          </span>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
            PROD v2.4
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          {language === 'hi'
            ? 'अखिल भारतीय एपीएमसी एवं ई-नाम मंडियों के बीच पारदर्शी आपूर्ति, उचित भाव एवं डिजिटल लॉजिस्टिक्स का एकीकृत सेतु।'
            : 'Unifying Indian APMC Mandis, Growers, Merchants & Consumers through transparent real-time price discovery.'}
        </p>

        {/* Startup Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 pt-1">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>e-NAM डेटा सम्बद्ध</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>28 राज्य एवं 75 यूपी जिले</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>डिजिटल मंडी पर्ची समर्थित</span>
          </span>
        </div>

        {/* The Exact User Requirement Highlighted Boldly */}
        <div className="pt-4 border-t border-zinc-800/80">
          <div className="inline-block bg-zinc-900/90 text-emerald-300 px-7 py-2.5 rounded-2xl border border-zinc-700/80 shadow-md">
            <p className="text-base sm:text-lg font-black tracking-wide text-white">
              मेड बाय कोर टाइटन
            </p>
            <p className="text-xs text-emerald-400 font-bold mt-0.5">
              Krishi Setu Platform • Developed by Team Core Titan
            </p>
          </div>
        </div>

        <div className="text-[11px] text-zinc-500 pt-2 font-medium">
          © {new Date().getFullYear()} Krishi Setu Platform • सर्वाधिकार सुरक्षित (All Rights Reserved)
        </div>
      </div>
    </footer>
  );
};
