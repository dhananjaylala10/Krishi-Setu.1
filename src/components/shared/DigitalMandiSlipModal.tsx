import React from 'react';
import type { Language, Crop, Mandi, QualityGrade } from '../../types';
import { QUALITY_GRADE_MULTIPLIERS } from '../../constants/logistics';
import { Printer, Share2, X, CheckCircle, QrCode } from 'lucide-react';

export interface MandiSlipData {
  farmerName: string;
  farmerContact: string;
  crop: Crop;
  mandi: Mandi;
  quantityKg: number;
  ratePerKg: number;
  grade: QualityGrade;
  grossAmount: number;
  freightCost: number;
  apmcCess: number;
  netPayout: number;
  merchantName: string;
  date: string;
}

interface DigitalMandiSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MandiSlipData | null;
  language: Language;
}

export const DigitalMandiSlipModal: React.FC<DigitalMandiSlipModalProps> = ({
  isOpen,
  onClose,
  data,
  language,
}) => {
  if (!isOpen || !data) return null;

  const voucherNo = `KS-UP-${((Math.abs(data.grossAmount * 37 + data.quantityKg * 19) % 899999) + 100000)}`;
  const gradeLabel = QUALITY_GRADE_MULTIPLIERS[data.grade]?.labelHi || 'Grade B';

  const handleShareWhatsApp = () => {
    const text = `🌾 *कृषि सेतु - डिजिटल मंडी बिक्री पर्ची* 🌾\n` +
      `--------------------------------\n` +
      `रसीद सं.: ${voucherNo}\n` +
      `किसान: ${data.farmerName || 'किसान बंधु'} (${data.farmerContact || 'N/A'})\n` +
      `मंडी: ${data.mandi.nameHi} (${data.mandi.cityHi})\n` +
      `फसल: ${data.crop.nameHi} [${gradeLabel}]\n` +
      `मात्रा: ${data.quantityKg} कि.ग्रा.\n` +
      `मंडी भाव: ₹${data.ratePerKg}/कि.ग्रा.\n` +
      `--------------------------------\n` +
      `सकल मूल्य: ₹${data.grossAmount.toLocaleString('en-IN')}\n` +
      `(-) भाड़ा/लॉजिस्टिक्स: ₹${data.freightCost.toLocaleString('en-IN')}\n` +
      `(-) मंडी शुल्क (1.5%): ₹${data.apmcCess.toLocaleString('en-IN')}\n` +
      `--------------------------------\n` +
      `*शुद्ध देय भुगतान: ₹${data.netPayout.toLocaleString('en-IN')}*\n` +
      `आढ़ती/व्यापारी: ${data.merchantName}\n` +
      `सत्यापित: e-NAM एवं कृषि सेतु नेटवर्क\n` +
      `मेड बाय कोर टाइटन (Core Titan Platform)`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-zinc-200 relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Voucher Header */}
        <div className="text-center pb-4 border-b-2 border-dashed border-zinc-300">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <span>🌾</span>
            <span>KRISHI SETU • ई-मंडी गेट पास</span>
          </div>
          <h2 className="text-2xl font-black text-zinc-900">
            {language === 'hi' ? 'डिजिटल मंडी बिक्री पर्ची' : 'Digital Mandi Sale Voucher'}
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            APMC अधिकृत कृषि विपणन रसीद • रसीद सं: <span className="font-mono font-bold text-zinc-800">{voucherNo}</span>
          </p>
          <div className="text-[11px] text-zinc-400 mt-0.5">
            दिनांक: {data.date || 'आज'} | व्यापार सत्र: प्रातः (Morning APMC Session)
          </div>
        </div>

        {/* Mandi & Farmer Info */}
        <div className="grid grid-cols-2 gap-3 py-4 text-xs border-b border-zinc-200">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-zinc-400">किसान विवरण</span>
            <div className="font-bold text-zinc-900 text-sm">{data.farmerName || 'श्री किसान'}</div>
            <div className="text-zinc-600">{data.farmerContact || 'संपर्क दर्ज नहीं'}</div>
            <div className="text-zinc-500">स्थान: {data.mandi.cityHi} परिक्षेत्र</div>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-[10px] uppercase font-bold text-zinc-400">मंडी एवं आढ़त</span>
            <div className="font-bold text-emerald-900 text-sm">{data.mandi.nameHi}</div>
            <div className="text-zinc-600">{data.mandi.cityHi}, {data.mandi.stateHi}</div>
            <div className="text-zinc-500">आढ़ती: {data.merchantName}</div>
          </div>
        </div>

        {/* Commodity Particulars Table */}
        <div className="py-3 border-b border-zinc-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-400 uppercase text-[10px] font-bold border-b border-zinc-100 pb-1">
                <th className="text-left pb-1">जिंस (फसल)</th>
                <th className="text-center pb-1">ग्रेड</th>
                <th className="text-right pb-1">मात्रा</th>
                <th className="text-right pb-1">भाव</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td className="py-2 font-bold text-zinc-900 flex items-center gap-1.5">
                  <span className="text-lg">{data.crop.icon}</span>
                  <span>{data.crop.nameHi}</span>
                </td>
                <td className="py-2 text-center">
                  <span className="bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                    Grade {data.grade}
                  </span>
                </td>
                <td className="py-2 text-right font-bold text-zinc-800">{data.quantityKg} kg</td>
                <td className="py-2 text-right font-black text-emerald-800">₹{data.ratePerKg}/kg</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Financial Breakdown */}
        <div className="py-3 space-y-1.5 text-xs border-b border-zinc-200">
          <div className="flex justify-between text-zinc-600">
            <span>सकल मूल्य (Gross Value):</span>
            <span className="font-bold text-zinc-900">₹{data.grossAmount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>(-) अनुमानित वाहन भाड़ा (Freight):</span>
            <span className="font-medium text-rose-700">-₹{data.freightCost.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>(-) मंडी विकास शुल्क (1.5% APMC Cess):</span>
            <span className="font-medium text-rose-700">-₹{data.apmcCess.toLocaleString('en-IN')}</span>
          </div>
          <div className="pt-2 border-t border-zinc-200 flex justify-between items-center">
            <span className="text-sm font-black text-zinc-900">शुद्ध इन-हैंड भुगतान (Net In-Hand):</span>
            <span className="text-xl font-black text-emerald-700">₹{data.netPayout.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Verification Footer with Core Titan Stamp */}
        <div className="pt-4 flex items-center justify-between text-zinc-400 text-[11px]">
          <div className="flex items-center gap-2">
            <QrCode className="w-9 h-9 text-zinc-800 p-1 border rounded-lg bg-zinc-50" />
            <div>
              <div className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>e-NAM एवं APMC सत्यापित</span>
              </div>
              <div className="text-[10px] text-zinc-500">डिजिटल हस्ताक्षर: कोर टाइटन एग्रीटेक</div>
            </div>
          </div>
          <div className="text-right">
            <span className="font-extrabold text-zinc-700 block">मेड बाय कोर टाइटन</span>
            <span className="text-[9px] text-zinc-400 font-mono">v2.4-SECURE</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer text-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>व्हाट्सएप पर भेजें</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-900 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer text-sm"
          >
            <Printer className="w-4 h-4" />
            <span>प्रिंट / सेव करें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
