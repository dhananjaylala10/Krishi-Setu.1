import React from 'react';
import type { GovtNotice, Language } from '../../../types';
import { FileText } from 'lucide-react';

interface GovtNoticesListProps {
  govtNotices: GovtNotice[];
  language: Language;
}

export const GovtNoticesList: React.FC<GovtNoticesListProps> = ({
  govtNotices,
  language,
}) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
        <FileText className="w-5 h-5 text-indigo-700" />
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'hi' ? 'सरकारी एडवाइजरी एवं सप्लाई बुलेटिन' : 'Government Advisories & Supply Bulletins'}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {govtNotices.map((n) => (
          <div key={n.id} className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-indigo-800 bg-white px-2 py-0.5 rounded border border-indigo-200">
                {n.date}
              </span>
            </div>
            <h3 className="font-extrabold text-gray-900 text-base mt-1">
              {language === 'hi' ? n.titleHi : n.titleEn}
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              {language === 'hi' ? n.descHi : n.descEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
