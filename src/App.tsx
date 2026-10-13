import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LiveTicker } from './components/shared/LiveTicker';
import { LocationSelector } from './components/shared/LocationSelector';
import { FarmerView } from './components/roles/FarmerView';
import { MerchantView } from './components/roles/MerchantView';
import { GovtView } from './components/roles/GovtView';
import { ConsumerView } from './components/roles/ConsumerView';
import { Sprout, Store, Landmark, ShoppingBasket, CheckCircle2 } from 'lucide-react';
import type { UserRole } from './types';

const MainLayout: React.FC = () => {
  const { role, setRole, language, toastMessage } = useApp();

  const mobileNavItems: { id: UserRole; labelHi: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: 'farmer', labelHi: 'किसान', labelEn: 'Farmer', icon: <Sprout className="w-5 h-5" /> },
    { id: 'merchant', labelHi: 'मर्चेंट', labelEn: 'Merchant', icon: <Store className="w-5 h-5" /> },
    { id: 'govt', labelHi: 'सरकार', labelEn: 'Govt', icon: <Landmark className="w-5 h-5" /> },
    { id: 'consumer', labelHi: 'कंज्यूमर', labelEn: 'Consumer', icon: <ShoppingBasket className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 sm:pb-0">
      {/* Top Navigation */}
      <Navbar />

      {/* Live Rates Ticker */}
      <LiveTicker />

      {/* State & City Location Search Selector */}
      <LocationSelector />

      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:w-96 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-xl border border-emerald-500 flex items-start gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Role-Based Dynamic Main View */}
      <main className="flex-grow">
        {role === 'farmer' && <FarmerView />}
        {role === 'merchant' && <MerchantView />}
        {role === 'govt' && <GovtView />}
        {role === 'consumer' && <ConsumerView />}
      </main>

      {/* Footer with 'मेड बाय कोर टाइटन' */}
      <Footer />

      {/* Mobile Sticky Bottom Bar (Safe for WebView / Mobile touch) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 px-2 py-1 flex items-center justify-around shadow-lg">
        {mobileNavItems.map((item) => {
          const isActive = role === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setRole(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors text-[11px] font-bold ${
                isActive ? 'text-emerald-700 font-extrabold' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <div
                className={`p-1 rounded-md ${
                  isActive ? 'bg-emerald-100 text-emerald-800' : ''
                }`}
              >
                {item.icon}
              </div>
              <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
