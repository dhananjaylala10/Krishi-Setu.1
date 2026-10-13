import React, { useState } from 'react';
import type { Crop, Language, QualityGrade } from '../../../types';

interface FarmerListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCrop: Crop;
  language: Language;
  onSubmit: (data: {
    farmerName: string;
    quantityKg: number;
    expectedPrice: number;
    location: string;
    contact: string;
    qualityGrade?: QualityGrade;
    expectedDate?: string;
  }) => void;
}

export const FarmerListingModal: React.FC<FarmerListingModalProps> = ({
  isOpen,
  onClose,
  selectedCrop,
  language,
  onSubmit,
}) => {
  const [farmerName, setFarmerName] = useState<string>('');
  const [listingQty, setListingQty] = useState<number>(1500);
  const [listingPrice, setListingPrice] = useState<number>(selectedCrop.basePrice);
  const [farmerLocation, setFarmerLocation] = useState<string>('');
  const [farmerPhone, setFarmerPhone] = useState<string>('');
  const [grade, setGrade] = useState<QualityGrade>('A');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !farmerPhone.trim()) {
      alert(language === 'hi' ? 'कृपया नाम और मोबाइल नंबर भरें' : 'Please provide name and phone');
      return;
    }

    onSubmit({
      farmerName: farmerName.trim(),
      quantityKg: listingQty,
      expectedPrice: listingPrice,
      location: farmerLocation.trim() || (language === 'hi' ? 'स्थानीय फार्म' : 'Local Farm'),
      contact: farmerPhone.trim(),
      qualityGrade: grade,
      expectedDate: 'आज / Today',
    });

    setFarmerName('');
    setFarmerPhone('');
    setFarmerLocation('');
    onClose();
  };

  return (
    <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 shadow-md animate-in fade-in duration-200">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-100">
        <h2 className="text-xl font-black text-zinc-900 flex items-center gap-2">
          <span>🌾</span>
          <span>
            {language === 'hi'
              ? `फसल लॉट बिक्री पंजीकरण (${selectedCrop.nameHi})`
              : `Produce Lot Sale Registration (${selectedCrop.nameEn})`}
          </span>
        </h2>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-700 font-bold text-lg cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1">
            {language === 'hi' ? 'किसान / कृषक का नाम *' : 'Farmer Name *'}
          </label>
          <input
            type="text"
            required
            value={farmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            placeholder={language === 'hi' ? 'जैसे: रमेश सिंह पटेल' : 'e.g. Ramesh Patel'}
            className="w-full px-3 py-2 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1">
            {language === 'hi' ? 'मात्रा (कि.ग्रा.) *' : 'Quantity (kg) *'}
          </label>
          <input
            type="number"
            required
            min="10"
            value={listingQty}
            onChange={(e) => setListingQty(Number(e.target.value))}
            className="w-full px-3 py-2 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1">
            {language === 'hi' ? 'अपेक्षित भाव (₹ प्रति कि.ग्रा.)' : 'Expected Rate (₹/kg)'}
          </label>
          <input
            type="number"
            required
            min="1"
            value={listingPrice}
            onChange={(e) => setListingPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1">
            {language === 'hi' ? 'गुणवत्ता ग्रेड (Quality Grade)' : 'Quality Grade'}
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value as QualityGrade)}
            className="w-full px-3 py-2 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 font-bold bg-zinc-50"
          >
            <option value="A">Grade A (सुपर/प्रीमियम क्वालिटी)</option>
            <option value="B">Grade B (मध्यम/मानक मंडी ग्रेड)</option>
            <option value="C">Grade C (सामान्य/प्रोसेसिंग)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1">
            {language === 'hi' ? 'गाँव / मंडी क्षेत्र' : 'Village / Location'}
          </label>
          <input
            type="text"
            value={farmerLocation}
            onChange={(e) => setFarmerLocation(e.target.value)}
            placeholder={language === 'hi' ? 'जैसे: खंदौली, आगरा' : 'e.g. Khandauli, Agra'}
            className="w-full px-3 py-2 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1">
            {language === 'hi' ? 'मोबाइल नंबर (WhatsApp) *' : 'Phone / WhatsApp *'}
          </label>
          <input
            type="tel"
            required
            value={farmerPhone}
            onChange={(e) => setFarmerPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-3 py-2 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 font-bold"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-zinc-300 font-bold text-sm text-zinc-700 hover:bg-zinc-50 cursor-pointer"
          >
            {language === 'hi' ? 'रद्द करें' : 'Cancel'}
          </button>
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-6 rounded-xl shadow-xs transition-colors cursor-pointer text-sm"
          >
            {language === 'hi' ? '✔ अभी सबमिट करें (Post Listing)' : '✔ Post Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};
