import type { Crop, Mandi, MarketItem, FarmerListing, GovtNotice, StockStatus } from '../types';
import { ALL_INDIAN_STATES } from './indiaLocations';

export const CROPS: Crop[] = [
  // 🥬 सब्जियां (Daily Vegetables)
  {
    id: 'crop-tomato',
    nameHi: 'टमाटर',
    nameEn: 'Tomato',
    category: 'vegetable',
    icon: '🍅',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 35,
  },
  {
    id: 'crop-potato',
    nameHi: 'आलू',
    nameEn: 'Potato',
    category: 'vegetable',
    icon: '🥔',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 18,
  },
  {
    id: 'crop-onion',
    nameHi: 'प्याज',
    nameEn: 'Onion',
    category: 'vegetable',
    icon: '🧅',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 28,
  },
  {
    id: 'crop-chilli',
    nameHi: 'हरी मिर्च',
    nameEn: 'Green Chilli',
    category: 'vegetable',
    icon: '🌶️',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 48,
  },
  {
    id: 'crop-cauliflower',
    nameHi: 'फूलगोभी',
    nameEn: 'Cauliflower',
    category: 'vegetable',
    icon: '🥦',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 25,
  },
  {
    id: 'crop-cabbage',
    nameHi: 'पत्तागोभी',
    nameEn: 'Cabbage',
    category: 'vegetable',
    icon: '🥬',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 20,
  },
  {
    id: 'crop-brinjal',
    nameHi: 'बैंगन',
    nameEn: 'Brinjal',
    category: 'vegetable',
    icon: '🍆',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 22,
  },
  {
    id: 'crop-okra',
    nameHi: 'भिंडी',
    nameEn: 'Ladyfinger / Bhindi',
    category: 'vegetable',
    icon: '🫛',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 32,
  },
  {
    id: 'crop-peas',
    nameHi: 'हरी मटर',
    nameEn: 'Green Peas',
    category: 'vegetable',
    icon: '🟢',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 45,
  },
  {
    id: 'crop-carrot',
    nameHi: 'गाजर',
    nameEn: 'Carrot',
    category: 'vegetable',
    icon: '🥕',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 28,
  },
  {
    id: 'crop-radish',
    nameHi: 'मूली',
    nameEn: 'Radish',
    category: 'vegetable',
    icon: '🥢',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 18,
  },
  {
    id: 'crop-cucumber',
    nameHi: 'खीरा',
    nameEn: 'Cucumber',
    category: 'vegetable',
    icon: '🥒',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 24,
  },
  {
    id: 'crop-capsicum',
    nameHi: 'शिमला मिर्च',
    nameEn: 'Capsicum',
    category: 'vegetable',
    icon: '🫑',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 42,
  },
  {
    id: 'crop-bottle-gourd',
    nameHi: 'लौकी / घिया',
    nameEn: 'Bottle Gourd',
    category: 'vegetable',
    icon: '🍈',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 20,
  },
  {
    id: 'crop-pumpkin',
    nameHi: 'कद्दू / सीताफल',
    nameEn: 'Pumpkin',
    category: 'vegetable',
    icon: '🎃',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 16,
  },
  {
    id: 'crop-bitter-gourd',
    nameHi: 'करेला',
    nameEn: 'Bitter Gourd',
    category: 'vegetable',
    icon: '🥒',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 36,
  },
  {
    id: 'crop-spinach',
    nameHi: 'पालक',
    nameEn: 'Spinach',
    category: 'vegetable',
    icon: '🥬',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 22,
  },
  {
    id: 'crop-coriander',
    nameHi: 'हरा धनिया',
    nameEn: 'Coriander Leaves',
    category: 'vegetable',
    icon: '🌿',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 35,
  },

  // 🧄 मसाले एवं कंद (Spices & Roots)
  {
    id: 'crop-garlic',
    nameHi: 'लहसुन',
    nameEn: 'Garlic',
    category: 'spice',
    icon: '🧄',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 180,
  },
  {
    id: 'crop-ginger',
    nameHi: 'अदरक',
    nameEn: 'Ginger',
    category: 'spice',
    icon: '🫚',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 120,
  },
  {
    id: 'crop-turmeric',
    nameHi: 'हल्दी',
    nameEn: 'Turmeric',
    category: 'spice',
    icon: '🟡',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 95,
  },

  // 🌾 अनाज व खाद्यान्न (Grains & Cereals)
  {
    id: 'crop-wheat',
    nameHi: 'गेहूं',
    nameEn: 'Wheat',
    category: 'grain',
    icon: '🌾',
    unitHi: 'प्रति क्विंटल',
    unitEn: 'per quintal',
    basePrice: 2450,
  },
  {
    id: 'crop-rice',
    nameHi: 'चावल (बासमती)',
    nameEn: 'Rice (Basmati)',
    category: 'grain',
    icon: '🍚',
    unitHi: 'प्रति क्विंटल',
    unitEn: 'per quintal',
    basePrice: 4200,
  },
  {
    id: 'crop-maize',
    nameHi: 'मक्का',
    nameEn: 'Maize / Corn',
    category: 'grain',
    icon: '🌽',
    unitHi: 'प्रति क्विंटल',
    unitEn: 'per quintal',
    basePrice: 2100,
  },
  {
    id: 'crop-bajra',
    nameHi: 'बाजरा',
    nameEn: 'Bajra',
    category: 'grain',
    icon: '🌾',
    unitHi: 'प्रति क्विंटल',
    unitEn: 'per quintal',
    basePrice: 2250,
  },

  // 🫘 दालें व तिलहन (Pulses & Oilseeds)
  {
    id: 'crop-chana',
    nameHi: 'चना (देसी)',
    nameEn: 'Chana / Chickpeas',
    category: 'pulse',
    icon: '🫘',
    unitHi: 'प्रति क्विंटल',
    unitEn: 'per quintal',
    basePrice: 5800,
  },
  {
    id: 'crop-arhar',
    nameHi: 'अरहर / तुवर दाल',
    nameEn: 'Arhar / Toor Dal',
    category: 'pulse',
    icon: '🫘',
    unitHi: 'प्रति क्विंटल',
    unitEn: 'per quintal',
    basePrice: 9200,
  },
  {
    id: 'crop-mustard',
    nameHi: 'सरसों / राई',
    nameEn: 'Mustard Seeds',
    category: 'pulse',
    icon: '🟡',
    unitHi: 'प्रति क्विंटल',
    unitEn: 'per quintal',
    basePrice: 5400,
  },
  {
    id: 'crop-soybean',
    nameHi: 'सोयाबीन',
    nameEn: 'Soybean',
    category: 'pulse',
    icon: '🫘',
    unitHi: 'प्रति क्विंटल',
    unitEn: 'per quintal',
    basePrice: 4400,
  },

  // 🍎 फल व नकदी फसलें (Fruits & Cash Crops)
  {
    id: 'crop-mango',
    nameHi: 'आम (दशहरी / लंगड़ा)',
    nameEn: 'Mango',
    category: 'fruit',
    icon: '🥭',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 55,
  },
  {
    id: 'crop-banana',
    nameHi: 'केला',
    nameEn: 'Banana',
    category: 'fruit',
    icon: '🍌',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 32,
  },
  {
    id: 'crop-apple',
    nameHi: 'सेब',
    nameEn: 'Apple',
    category: 'fruit',
    icon: '🍎',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 95,
  },
  {
    id: 'crop-amla',
    nameHi: 'आंवला (प्रतापगढ़ स्पेशल)',
    nameEn: 'Amla (Gooseberry)',
    category: 'fruit',
    icon: '🟢',
    unitHi: 'प्रति किलो',
    unitEn: 'per kg',
    basePrice: 38,
  },
  {
    id: 'crop-sugarcane',
    nameHi: 'गन्ना',
    nameEn: 'Sugarcane',
    category: 'cash',
    icon: '🎋',
    unitHi: 'प्रति क्विंटल',
    unitEn: 'per quintal',
    basePrice: 370,
  },
  {
    id: 'crop-cotton',
    nameHi: 'कपास / रूई',
    nameEn: 'Cotton',
    category: 'cash',
    icon: '☁️',
    unitHi: 'प्रति क्विंटल',
    unitEn: 'per quintal',
    basePrice: 6800,
  },
];

// Dynamically generate all mandis across all 28 states & union territories of India
export const MANDIS: Mandi[] = [];
const seenMandiIds = new Set<string>();

ALL_INDIAN_STATES.forEach((state) => {
  state.cities.forEach((city, idx) => {
    const rawSlug = `${city.cityEn}-${city.mandiNameEn}`.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 45);
    let mandiId = `mandi-${rawSlug}`;
    if (seenMandiIds.has(mandiId)) {
      mandiId = `mandi-${rawSlug}-${idx}`;
    }
    seenMandiIds.add(mandiId);

    MANDIS.push({
      id: mandiId,
      nameHi: city.mandiNameHi,
      nameEn: city.mandiNameEn,
      cityHi: city.cityHi,
      cityEn: city.cityEn,
      stateHi: state.stateHi,
      stateEn: state.stateEn,
      distanceKm: city.distanceKm,
    });
  });
});

const MERCHANTS_LIST = [
  'रामेश्वर दयाल & संस',
  'पाटिल ट्रेडर्स',
  'सह्याद्री एग्रो फ्रूट्स',
  'श्री वेंकटेश्वर ट्रेडर्स',
  'मालवा कृषि भंडार',
  'गुप्ता जी एंड ब्रदर्स',
  'गोयल पोटैटो कंपनी',
  'चौधरी ट्रेडर्स',
  'अग्रवाल अनियन स्टोर',
  'पंजाब ग्रेंस आढ़त',
  'किसान मित्र ट्रेडिंग कंपनी',
  'भारत कृषि केंद्र',
  'सरदार जी ट्रेडर्स',
  'महावीर दाल एंड ग्रेन स्टोर',
  'अन्नपूर्णा वेजिटेबल सप्लायर्स',
];

// Generate comprehensive market items for every mandi and crop
export const INITIAL_MARKET_ITEMS: MarketItem[] = [];

MANDIS.forEach((mandi, mIdx) => {
  CROPS.forEach((crop, cIdx) => {
    const hash = (mIdx * 17 + cIdx * 31) % 100;

    let stockStatus: StockStatus = 'normal';
    if (hash < 14) {
      stockStatus = 'severe_shortage';
    } else if (hash < 32) {
      stockStatus = 'low';
    } else if (hash > 76) {
      stockStatus = 'surplus';
    }

    // Specific highlight overrides for famous agricultural trading hubs
    if (mandi.cityEn.toLowerCase().includes('delhi') && crop.id === 'crop-tomato') stockStatus = 'severe_shortage';
    if (mandi.cityEn.toLowerCase().includes('kolar') && crop.id === 'crop-tomato') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('nashik') && crop.id === 'crop-onion') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('indore') && crop.id === 'crop-potato') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('farrukhabad') && crop.id === 'crop-potato') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('agra') && crop.id === 'crop-potato') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('chandauli') && crop.id === 'crop-rice') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('shahjahanpur') && crop.id === 'crop-wheat') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('guntur') && crop.id === 'crop-chilli') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('mandsaur') && crop.id === 'crop-garlic') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('ludhiana') && crop.id === 'crop-wheat') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('karnal') && crop.id === 'crop-rice') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('pratapgarh') && crop.id === 'crop-amla') stockStatus = 'surplus';
    if (mandi.cityEn.toLowerCase().includes('muzaffarnagar') && crop.id === 'crop-sugarcane') stockStatus = 'surplus';

    let priceMultiplier = 1.0;
    if (stockStatus === 'severe_shortage') priceMultiplier = 1.25 + ((hash % 10) / 100);
    else if (stockStatus === 'low') priceMultiplier = 1.10 + ((hash % 8) / 100);
    else if (stockStatus === 'surplus') priceMultiplier = 0.84 - ((hash % 8) / 100);
    else priceMultiplier = 0.96 + ((hash % 10) / 100);

    const wholesalePrice = Math.round(crop.basePrice * priceMultiplier);
    const isQuintalCrop = crop.unitEn === 'per quintal';
    const retailMarkup = isQuintalCrop
      ? Math.max(120, Math.round(wholesalePrice * 0.12))
      : Math.max(4, Math.round(wholesalePrice * 0.22));
    const retailPrice = wholesalePrice + retailMarkup;

    let stockQuantityKg = 12000;
    if (isQuintalCrop) {
      stockQuantityKg =
        stockStatus === 'severe_shortage' ? 8000 : stockStatus === 'surplus' ? 120000 : 45000;
    } else {
      stockQuantityKg =
        stockStatus === 'severe_shortage' ? 1100 : stockStatus === 'surplus' ? 52000 : 9500;
    }

    const merchantName = MERCHANTS_LIST[(mIdx + cIdx) % MERCHANTS_LIST.length];
    const phoneDigit = ((mIdx * 37 + cIdx * 53) % 900000000) + 100000000;
    const merchantContact = `+91 9${phoneDigit}`;

    const arrivalQuintals = Math.round(
      isQuintalCrop
        ? (stockQuantityKg / 100) * (0.8 + (hash % 5) / 10)
        : Math.max(45, (stockQuantityKg / 60) * (0.8 + (hash % 5) / 10))
    );

    const isPriceUp = stockStatus === 'severe_shortage' || (stockStatus !== 'surplus' && hash % 2 === 0);
    const trendPercent = Math.round(((hash % 6) + 1.4) * 10) / 10;
    const trendChange = Math.max(1, Math.round(wholesalePrice * (trendPercent / 100)));

    const days = ['सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'आज'];
    const history7Days = days.map((day, dIdx) => {
      const dayFactor = 1 + ((dIdx - 3) * (isPriceUp ? 0.015 : -0.012)) + (((hash + dIdx) % 5 - 2) * 0.008);
      return {
        day,
        price: Math.max(5, Math.round(wholesalePrice * dayFactor)),
      };
    });

    const apmcLicense = `APMC-${mandi.stateEn.slice(0, 2).toUpperCase()}-${(mIdx % 899) + 1100}`;

    INITIAL_MARKET_ITEMS.push({
      id: `mi-${mandi.id}-${crop.id}`,
      mandiId: mandi.id,
      cropId: crop.id,
      wholesalePrice,
      retailPrice,
      stockStatus,
      stockQuantityKg,
      merchantName,
      merchantContact,
      lastUpdated: 'आज 10:30 AM',
      arrivalQuintals,
      priceTrend: {
        change: trendChange,
        percent: trendPercent,
        isUp: isPriceUp,
      },
      history7Days,
      apmcLicense,
      isOpen: true,
    });
  });
});

export const INITIAL_FARMER_LISTINGS: FarmerListing[] = [
  {
    id: 'fl-1',
    farmerName: 'रमेश कुमार पटेल',
    cropId: 'crop-tomato',
    quantityKg: 2500,
    expectedPrice: 32,
    location: 'पिंपलगांव, नासिक (महाराष्ट्र)',
    contact: '+91 98220 11445',
    createdAt: '2 घंटे पहले',
  },
  {
    id: 'fl-2',
    farmerName: 'सुरेश चंद्र यादव',
    cropId: 'crop-potato',
    quantityKg: 8000,
    expectedPrice: 16,
    location: 'देवास रोड, इंदौर (मध्य प्रदेश)',
    contact: '+91 98265 99881',
    createdAt: '4 घंटे पहले',
  },
  {
    id: 'fl-3',
    farmerName: 'हरप्रीत सिंह',
    cropId: 'crop-wheat',
    quantityKg: 15000,
    expectedPrice: 2450,
    location: 'करनाल (हरियाणा)',
    contact: '+91 98120 44332',
    createdAt: 'आज सुबह',
  },
  {
    id: 'fl-4',
    farmerName: 'व्यंकटेश रेड्डी',
    cropId: 'crop-chilli',
    quantityKg: 4000,
    expectedPrice: 52,
    location: 'गुंटूर (आंध्र प्रदेश)',
    contact: '+91 94401 22334',
    createdAt: '3 घंटे पहले',
  },
  {
    id: 'fl-5',
    farmerName: 'सुनील कुमार चौबे',
    cropId: 'crop-potato',
    quantityKg: 12000,
    expectedPrice: 17,
    location: 'मुजफ्फरपुर (बिहार)',
    contact: '+91 94312 88990',
    createdAt: '1 घंटा पहले',
  },
];

export const INITIAL_GOVT_NOTICES: GovtNotice[] = [
  {
    id: 'gn-1',
    titleHi: 'राष्ट्रीय टमाटर व प्याज आपूर्ति निगरानी चेतावनी',
    titleEn: 'National Tomato & Onion Supply Surveillance Alert',
    descHi: 'दिल्ली NCR, लखनऊ और मुंबई मंडियों में टमाटर की आवक कम दर्ज की गई है। कोलार (कर्नाटक) और नासिक से स्पेशल एग्री-ट्रक डिस्पैच करने के निर्देश दिए गए हैं।',
    descEn: 'Tomato arrival down in Delhi NCR, Lucknow, and Mumbai. Directives issued to fast-track agri-trucks from Kolar and Nashik.',
    type: 'shortage_alert',
    cropId: 'crop-tomato',
    date: 'आज 11:00 AM',
  },
  {
    id: 'gn-2',
    titleHi: 'आलू, गेहूं एवं चावल का पर्याप्त बफर स्टॉक उपलब्ध',
    titleEn: 'Adequate Buffer Stock Available for Potato, Wheat & Rice',
    descHi: 'उत्तर प्रदेश, पंजाब और मध्य प्रदेश में पर्याप्त स्टॉक है। बाजार में किसी भी कृत्रिम कमी पर कड़ी निगरानी रखी जा रही है।',
    descEn: 'Sufficient reserves in UP, Punjab & MP zones. Strict monitoring active to prevent artificial price hikes.',
    type: 'advisory',
    cropId: 'crop-potato',
    date: 'आज 09:15 AM',
  },
];
