import React from 'react';
import type { FarmerListing, Language } from '../../../types';
import { CROPS } from '../../../data/mockData';
import { QUALITY_GRADE_MULTIPLIERS } from '../../../constants/logistics';
import { Phone, MessageSquare, MapPin } from 'lucide-react';

interface FarmerOffersListProps {
  farmerListings: FarmerListing[];
  language: Language;
}

export const FarmerOffersList: React.FC<FarmerOffersListProps> = ({
  farmerListings,
  language,
}) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌾</span>
            <h2 className="text-lg sm:text-xl font-black text-zinc-900">
              {language === 'hi'
                ? 'कृषकों द्वारा पंजीकृत विक्रय लॉट (Direct Farmer Offerings)'
                : 'Direct Farmer Crop Lots Available'}
            </h2>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            {language === 'hi'
              ? 'आसपास के किसानों द्वारा बिक्री हेतु सूचीबद्ध फसलें — आप सीधे खरीद हेतु कॉल अथवा व्हाट्सएप कर सकते हैं:'
              : 'Harvest lots posted by local growers for immediate APMC procurement:'}
          </p>
        </div>
        <span className="bg-zinc-100 text-zinc-800 text-xs font-black px-3 py-1 rounded-full border border-zinc-200">
          {farmerListings.length} {language === 'hi' ? 'लॉट सक्रिय' : 'Active Lots'}
        </span>
      </div>

      {farmerListings.length === 0 ? (
        <div className="text-center py-8 text-zinc-400 text-sm">
          {language === 'hi' ? 'फिलहाल कोई किसान लॉट उपलब्ध नहीं है।' : 'No farmer lots available right now.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {farmerListings.map((listing) => {
            const crop = CROPS.find((c) => c.id === listing.cropId);
            const grade = listing.qualityGrade || 'A';
            const gradeInfo = QUALITY_GRADE_MULTIPLIERS[grade];

            const handleWhatsApp = () => {
              const text = `नमस्ते ${listing.farmerName} जी,\n` +
                `मैंने कृषि सेतु पोर्टल पर आपके *${crop?.nameHi}* [Grade ${grade}] का लॉट (${listing.quantityKg} कि.ग्रा. @ ₹${listing.expectedPrice}/kg) देखा है।\n` +
                `हम इस लॉट की खरीद में रुचि रखते हैं। कृपया माल की वर्तमान स्थिति बताएं।`;
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            };

            return (
              <div
                key={listing.id}
                className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl p-1.5 bg-white rounded-xl border border-zinc-200">
                        {crop?.icon}
                      </span>
                      <div>
                        <span className="font-extrabold text-sm text-zinc-900 block">
                          {language === 'hi' ? crop?.nameHi : crop?.nameEn}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono">LOT-{listing.id.toUpperCase()}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${gradeInfo?.badgeColor || 'bg-zinc-100 text-zinc-700'}`}>
                      Grade {grade}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-zinc-900">{listing.farmerName}</h3>
                  <div className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{listing.location} • {listing.createdAt}</span>
                  </div>

                  <div className="bg-white rounded-xl p-3 my-3 border border-zinc-200/70 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-zinc-400 uppercase font-bold">उपलब्ध लॉट मात्रा</div>
                      <div className="text-sm font-black text-zinc-800">{listing.quantityKg} kg</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-zinc-400 uppercase font-bold">अपेक्षित भाव</div>
                      <div className="text-base font-black text-emerald-800">
                        ₹{listing.expectedPrice}/kg
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-200/50">
                  <a
                    href={`tel:${listing.contact}`}
                    className="flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>कॉल करें</span>
                  </a>

                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-200" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
