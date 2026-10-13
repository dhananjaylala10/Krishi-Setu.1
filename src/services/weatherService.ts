import type { WeatherData, DayForecast } from '../types';

interface LatLon {
  lat: number;
  lon: number;
}

// Coordinate database for Uttar Pradesh districts and major Indian agricultural hubs
const CITY_COORDINATES: Record<string, LatLon> = {
  // Uttar Pradesh
  'lucknow': { lat: 26.8467, lon: 80.9462 },
  'kanpur': { lat: 26.4499, lon: 80.3319 },
  'kanpur nagar': { lat: 26.4499, lon: 80.3319 },
  'kanpur dehat': { lat: 26.4431, lon: 79.9577 },
  'varanasi': { lat: 25.3176, lon: 82.9739 },
  'prayagraj': { lat: 25.4358, lon: 81.8463 },
  'allahabad': { lat: 25.4358, lon: 81.8463 },
  'agra': { lat: 27.1767, lon: 78.0081 },
  'meerut': { lat: 28.9845, lon: 77.7064 },
  'gorakhpur': { lat: 26.7606, lon: 83.3732 },
  'bareilly': { lat: 28.3670, lon: 79.4304 },
  'aligarh': { lat: 27.8974, lon: 78.0880 },
  'moradabad': { lat: 28.8386, lon: 78.7733 },
  'saharanpur': { lat: 29.9640, lon: 77.5460 },
  'jhansi': { lat: 25.4484, lon: 78.5685 },
  'ayodhya': { lat: 26.7922, lon: 82.1998 },
  'faizabad': { lat: 26.7922, lon: 82.1998 },
  'muzaffarnagar': { lat: 29.4727, lon: 77.7085 },
  'mathura': { lat: 27.4924, lon: 77.6737 },
  'firozabad': { lat: 27.1594, lon: 78.3957 },
  'mainpuri': { lat: 27.2285, lon: 79.0289 },
  'etah': { lat: 27.5583, lon: 78.6657 },
  'hathras': { lat: 27.5976, lon: 78.0519 },
  'kasganj': { lat: 27.8078, lon: 78.6496 },
  'badaun': { lat: 28.0378, lon: 79.1264 },
  'budaun': { lat: 28.0378, lon: 79.1264 },
  'shahjahanpur': { lat: 27.8805, lon: 79.9120 },
  'pilibhit': { lat: 28.6288, lon: 79.8054 },
  'rampur': { lat: 28.8154, lon: 79.0257 },
  'bijnor': { lat: 29.3732, lon: 78.1357 },
  'amroha': { lat: 28.9044, lon: 78.4684 },
  'sambhal': { lat: 28.5843, lon: 78.5663 },
  'shamli': { lat: 29.4497, lon: 77.3117 },
  'baghpat': { lat: 28.9442, lon: 77.2185 },
  'ghaziabad': { lat: 28.6692, lon: 77.4538 },
  'hapur': { lat: 28.7306, lon: 77.7759 },
  'gautam buddha nagar': { lat: 28.5355, lon: 77.3910 },
  'noida': { lat: 28.5355, lon: 77.3910 },
  'bulandshahr': { lat: 28.4070, lon: 77.8498 },
  'etawah': { lat: 26.7769, lon: 79.0305 },
  'auraiya': { lat: 26.4674, lon: 79.5173 },
  'farrukhabad': { lat: 27.3828, lon: 79.5828 },
  'kannauj': { lat: 27.0545, lon: 79.9189 },
  'fatehpur': { lat: 25.9288, lon: 80.8126 },
  'pratapgarh': { lat: 25.8974, lon: 81.9442 },
  'kaushambi': { lat: 25.5317, lon: 81.4312 },
  'jalaun': { lat: 26.1478, lon: 79.3518 },
  'orai': { lat: 25.9898, lon: 79.4500 },
  'lalitpur': { lat: 24.6897, lon: 78.4144 },
  'hamirpur': { lat: 25.9547, lon: 80.1539 },
  'mahoba': { lat: 25.2917, lon: 79.8722 },
  'banda': { lat: 25.4764, lon: 80.3364 },
  'chitrakoot': { lat: 25.1764, lon: 80.8661 },
  'unnao': { lat: 26.5458, lon: 80.4878 },
  'hardoi': { lat: 27.3989, lon: 80.1313 },
  'lakhimpur kheri': { lat: 27.9463, lon: 80.7788 },
  'kheri': { lat: 27.9463, lon: 80.7788 },
  'sitapur': { lat: 27.5684, lon: 80.6829 },
  'rae bareli': { lat: 26.2236, lon: 81.2409 },
  'amethi': { lat: 26.1558, lon: 81.8153 },
  'sultanpur': { lat: 26.2648, lon: 82.0727 },
  'barabanki': { lat: 26.9274, lon: 81.1834 },
  'gonda': { lat: 27.1332, lon: 81.9619 },
  'bahraich': { lat: 27.5752, lon: 81.5977 },
  'shravasti': { lat: 27.5044, lon: 81.8906 },
  'balrampur': { lat: 27.4293, lon: 82.1804 },
  'basti': { lat: 26.8000, lon: 82.7667 },
  'siddharthnagar': { lat: 27.2798, lon: 82.8197 },
  'sant kabir nagar': { lat: 26.7770, lon: 83.0298 },
  'maharajganj': { lat: 27.1450, lon: 83.5606 },
  'kushinagar': { lat: 26.7410, lon: 83.8893 },
  'deoria': { lat: 26.5028, lon: 83.7791 },
  'azamgarh': { lat: 26.0688, lon: 83.1859 },
  'mau': { lat: 25.9417, lon: 83.5611 },
  'ballia': { lat: 25.7581, lon: 84.1483 },
  'jaunpur': { lat: 25.7464, lon: 82.6837 },
  'ghazipur': { lat: 25.5840, lon: 83.5770 },
  'chandauli': { lat: 25.2612, lon: 83.2706 },
  'mirzapur': { lat: 25.1337, lon: 82.5644 },
  'sonbhadra': { lat: 24.6853, lon: 83.0673 },
  'bhadohi': { lat: 25.3957, lon: 82.5714 },

  // Other key agri hubs across India
  'delhi': { lat: 28.6139, lon: 77.2090 },
  'mumbai': { lat: 19.0760, lon: 72.8777 },
  'nashik': { lat: 19.9975, lon: 73.7898 },
  'pune': { lat: 18.5204, lon: 73.8567 },
  'indore': { lat: 22.7196, lon: 75.8577 },
  'bhopal': { lat: 23.2599, lon: 77.4126 },
  'jaipur': { lat: 26.9124, lon: 75.7873 },
  'patna': { lat: 25.5941, lon: 85.1376 },
  'chandigarh': { lat: 30.7333, lon: 76.7794 },
  'karnal': { lat: 29.6857, lon: 76.9905 },
  'ludhiana': { lat: 30.9010, lon: 75.8573 },
  'guntur': { lat: 16.3067, lon: 80.4365 },
  'kolkata': { lat: 22.5726, lon: 88.3639 },
  'ahmedabad': { lat: 23.0225, lon: 72.5714 },
  'bengaluru': { lat: 12.9716, lon: 77.5946 },
};

// Interpretation of WMO weather codes
function interpretWeatherCode(code: number): { labelHi: string; labelEn: string; isRainy: boolean } {
  if (code === 0) {
    return { labelHi: 'साफ आसमान', labelEn: 'Clear Sky', isRainy: false };
  }
  if (code === 1 || code === 2) {
    return { labelHi: 'आंशिक बादल', labelEn: 'Partly Cloudy', isRainy: false };
  }
  if (code === 3) {
    return { labelHi: 'बादल छाए रहेंगे', labelEn: 'Overcast', isRainy: false };
  }
  if (code === 45 || code === 48) {
    return { labelHi: 'कोहरा व धुंध', labelEn: 'Fog & Mist', isRainy: false };
  }
  if (code >= 51 && code <= 55) {
    return { labelHi: 'हल्की बूंदाबांदी', labelEn: 'Light Drizzle', isRainy: true };
  }
  if (code >= 61 && code <= 65) {
    return { labelHi: 'वर्षा (बारिश)', labelEn: 'Rain', isRainy: true };
  }
  if (code >= 80 && code <= 82) {
    return { labelHi: 'तेज बौछारें', labelEn: 'Rain Showers', isRainy: true };
  }
  if (code >= 95) {
    return { labelHi: 'गरज-चमक व आंधी', labelEn: 'Thunderstorm', isRainy: true };
  }
  return { labelHi: 'सामान्य मौसम', labelEn: 'Moderate', isRainy: false };
}

// Generate smart agricultural and mandi transit advisories
function generateAgriAdvisories(
  temp: number,
  rainProb: number,
  windSpeed: number,
  isRainy: boolean
): { transitStatus: 'safe' | 'caution' | 'alert'; advisoryHi: string; advisoryEn: string } {
  if (isRainy || rainProb >= 60) {
    return {
      transitStatus: 'caution',
      advisoryHi: `⚠️ वर्षा की संभावना (${rainProb}%) — कटी फसल व अनाज को तिरपाल से सुरक्षित रखें। मंडी लोडिंग में वाटरप्रूफ कवर अनिवार्य।`,
      advisoryEn: `⚠️ Rain anticipated (${rainProb}%) — Cover produce with waterproof tarpaulin. Prevent moisture in mandi transit.`,
    };
  }

  if (windSpeed >= 28) {
    return {
      transitStatus: 'caution',
      advisoryHi: `💨 तेज हवाएं (${windSpeed} km/h) — वाहनों पर बोरियां व कैरेट सुरक्षित बांधें। कीटनाशक छिड़काव स्थगित रखें।`,
      advisoryEn: `💨 High wind gusts (${windSpeed} km/h) — Fasten cargo ropes tightly. Postpone pesticide spraying.`,
    };
  }

  if (temp >= 38) {
    return {
      transitStatus: 'caution',
      advisoryHi: `☀️ तीव्र गर्मी (${temp}°C) — टमाटर, धनिया व हरी सब्जियों की तुड़ाई एवं मंडी परिवहन भोर (सुबह 5 बजे) या शाम को करें।`,
      advisoryEn: `☀️ Intense heat (${temp}°C) — Harvest & transport perishables (tomatoes, greens) at dawn or after dusk.`,
    };
  }

  return {
    transitStatus: 'safe',
    advisoryHi: `✅ मौसम शुष्क व अनुकूल (${temp}°C) — फसल तुड़ाई, सुखाने, लोडिंग व मंडी परिवहन के लिए सर्वोत्तम समय। ग्रीन कॉरिडोर सुरक्षित।`,
    advisoryEn: `✅ Dry & favorable conditions (${temp}°C) — Ideal window for harvest, curing, packaging & mandi dispatch.`,
  };
}

// In-memory cache to prevent excessive requests (10 minutes TTL)
const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000;

/**
 * Fetch real-time weather from Open-Meteo API
 */
export async function fetchLiveWeather(locationName: string): Promise<WeatherData> {
  const cleanName = (locationName || 'lucknow').trim().toLowerCase();
  const cacheKey = cleanName;

  const cached = weatherCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // Find coordinates
  let coords = CITY_COORDINATES[cleanName];

  // Try matching partial district name
  if (!coords) {
    const matchedKey = Object.keys(CITY_COORDINATES).find((key) => cleanName.includes(key) || key.includes(cleanName));
    if (matchedKey) {
      coords = CITY_COORDINATES[matchedKey];
    }
  }

  // Fallback to Lucknow (UP heartland) if location coords not found
  const activeLat = coords ? coords.lat : 26.8467;
  const activeLon = coords ? coords.lon : 80.9462;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${activeLat}&longitude=${activeLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Open-Meteo returned status ${response.status}`);
    }

    const json = await response.json();
    const current = json.current;
    const daily = json.daily;

    const temp = Math.round(current.temperature_2m);
    const apparentTemp = Math.round(current.apparent_temperature);
    const humidity = Math.round(current.relative_humidity_2m);
    const windSpeed = Math.round(current.wind_speed_10m);
    const weatherCode = current.weather_code;
    const rainProb = daily?.precipitation_probability_max?.[0] ?? Math.round(current.precipitation > 0 ? 80 : 5);

    const { labelHi, labelEn, isRainy } = interpretWeatherCode(weatherCode);
    const { transitStatus, advisoryHi, advisoryEn } = generateAgriAdvisories(temp, rainProb, windSpeed, isRainy);

    const daysHindi = ['आज', 'कल', 'परसों'];
    const daysEnglish = ['Today', 'Tomorrow', 'Day After'];
    const forecast3Days: DayForecast[] = [0, 1, 2].map((idx) => ({
      dayHi: daysHindi[idx],
      dayEn: daysEnglish[idx],
      tempMax: Math.round(daily?.temperature_2m_max?.[idx] ?? temp + 2),
      tempMin: Math.round(daily?.temperature_2m_min?.[idx] ?? temp - 6),
      rainProb: Math.round(daily?.precipitation_probability_max?.[idx] ?? 10),
      weatherCode: daily?.weather_code?.[idx] ?? weatherCode,
    }));

    const result: WeatherData = {
      locationName: locationName || 'लखनऊ (उत्तर प्रदेश)',
      temperature: temp,
      apparentTemperature: apparentTemp,
      humidity,
      rainProbability: rainProb,
      windSpeed,
      weatherCode,
      weatherLabelHi: labelHi,
      weatherLabelEn: labelEn,
      isRainy,
      transitStatus,
      advisoryHi,
      advisoryEn,
      forecast3Days,
      isLive: true,
      lastUpdatedTime: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    weatherCache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  } catch (error) {
    console.warn('[WeatherService] Live API fetch failed, using smart realistic fallback:', error);

    // Graceful offline fallback
    return {
      locationName: locationName || 'उत्तर प्रदेश मंडी परिक्षेत्र',
      temperature: 28,
      apparentTemperature: 31,
      humidity: 68,
      rainProbability: 10,
      windSpeed: 8,
      weatherCode: 0,
      weatherLabelHi: 'साफ व शुष्क मौसम',
      weatherLabelEn: 'Clear & Sunny',
      isRainy: false,
      transitStatus: 'safe',
      advisoryHi: '✅ मौसम शुष्क व साफ (28°C) — फसल तुड़ाई, लोडिंग एवं मंडी परिवहन के पूर्णतः अनुकूल। ग्रीन कॉरिडोर सुरक्षित।',
      advisoryEn: '✅ Clear & dry weather (28°C) — Highly favorable for harvesting, loading & mandi transit.',
      forecast3Days: [
        { dayHi: 'आज', dayEn: 'Today', tempMax: 31, tempMin: 21, rainProb: 10, weatherCode: 0 },
        { dayHi: 'कल', dayEn: 'Tomorrow', tempMax: 32, tempMin: 22, rainProb: 15, weatherCode: 1 },
        { dayHi: 'परसों', dayEn: 'Day After', tempMax: 30, tempMin: 20, rainProb: 5, weatherCode: 0 },
      ],
      isLive: false,
      lastUpdatedTime: 'ऑफलाइन मोड',
    };
  }
}
