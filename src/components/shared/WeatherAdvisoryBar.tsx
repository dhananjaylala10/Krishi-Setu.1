import React, { useState, useEffect, useCallback } from 'react';
import type { Language, WeatherData } from '../../types';
import { fetchLiveWeather } from '../../services/weatherService';
import {
  Sun,
  CloudRain,
  CloudSun,
  Wind,
  Droplets,
  RotateCw,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface WeatherAdvisoryBarProps {
  locationName: string;
  language: Language;
}

export const WeatherAdvisoryBar: React.FC<WeatherAdvisoryBarProps> = ({
  locationName,
  language,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForecast, setShowForecast] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const loadWeather = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setLoading(true);

    try {
      const data = await fetchLiveWeather(locationName);
      setWeather(data);
    } catch {
      // Handled internally in weatherService
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [locationName]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const getWeatherIcon = (code: number, isRainy: boolean) => {
    if (isRainy || code >= 51) {
      return <CloudRain className="w-5 h-5 text-sky-300 animate-bounce" />;
    }
    if (code === 1 || code === 2 || code === 3) {
      return <CloudSun className="w-5 h-5 text-amber-200" />;
    }
    return <Sun className="w-5 h-5 text-amber-300" />;
  };

  const activeLabel = locationName || (language === 'hi' ? 'उत्तर प्रदेश कृषि क्षेत्र' : 'UP Mandi Region');

  return (
    <div className="bg-linear-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-700/40 transition-all">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left Section: Status, Location, Weather Condition */}
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15 shadow-inner">
            {loading ? (
              <RotateCw className="w-5 h-5 text-emerald-300 animate-spin" />
            ) : (
              getWeatherIcon(weather?.weatherCode ?? 0, weather?.isRainy ?? false)
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>{language === 'hi' ? 'लाइव उपग्रह मौसम API' : 'Live Satellite Weather API'}</span>
              </span>

              <span className="text-[11px] bg-emerald-800/80 text-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-600/70 font-semibold">
                📍 {activeLabel}
              </span>

              {weather && (
                <span className="text-[10px] text-zinc-300 bg-black/30 px-2 py-0.5 rounded-md font-mono">
                  {weather.isLive
                    ? `${language === 'hi' ? 'अपडेट' : 'Synced'}: ${weather.lastUpdatedTime}`
                    : 'Offline Fallback'}
                </span>
              )}
            </div>

            {loading ? (
              <div className="h-4 w-72 bg-white/10 rounded-sm animate-pulse mt-2" />
            ) : (
              <p className="text-xs sm:text-sm text-emerald-50 mt-1 font-medium leading-relaxed">
                {language === 'hi' ? weather?.advisoryHi : weather?.advisoryEn}
              </p>
            )}
          </div>
        </div>

        {/* Right Section: Real-time Metrics & Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs w-full lg:w-auto justify-between lg:justify-end border-t border-white/10 lg:border-t-0 pt-3 lg:pt-0">
          {/* Temperature Metric */}
          <div className="bg-black/25 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
            <span className="text-amber-300 font-bold text-sm">
              {loading ? '...' : `${weather?.temperature}°C`}
            </span>
            <span className="text-[10px] text-zinc-300">
              ({language === 'hi' ? weather?.weatherLabelHi : weather?.weatherLabelEn})
            </span>
          </div>

          {/* Rain Probability Metric */}
          <div className="bg-black/25 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 text-sky-200">
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
            <span>{language === 'hi' ? 'बारिश' : 'Rain'}:</span>
            <span className="font-bold text-white">{loading ? '...' : `${weather?.rainProbability}%`}</span>
          </div>

          {/* Wind Speed Metric */}
          <div className="bg-black/25 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 text-zinc-300">
            <Wind className="w-3.5 h-3.5 text-teal-300" />
            <span className="font-bold text-white">{loading ? '...' : `${weather?.windSpeed} km/h`}</span>
          </div>

          {/* Transit Safety Badge */}
          <div
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1 font-semibold ${
              weather?.transitStatus === 'caution'
                ? 'bg-amber-500/20 text-amber-200 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40'
            }`}
          >
            {weather?.transitStatus === 'caution' ? (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span>
              {weather?.transitStatus === 'caution'
                ? language === 'hi'
                  ? 'सतर्कता'
                  : 'Caution'
                : language === 'hi'
                ? 'ग्रीन कॉरिडोर'
                : 'Transit Safe'}
            </span>
          </div>

          {/* 3-Day Forecast Toggle */}
          <button
            onClick={() => setShowForecast(!showForecast)}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl border border-white/15 transition-all text-xs font-medium cursor-pointer"
            title={language === 'hi' ? '3-दिवसीय पूर्वानुमान देखें' : 'View 3-day forecast'}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-300" />
            <span>{language === 'hi' ? '3-दिन' : '3-Day'}</span>
            {showForecast ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Manual Refresh Button */}
          <button
            onClick={() => loadWeather(true)}
            disabled={isRefreshing}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-zinc-200 hover:text-white transition-all cursor-pointer disabled:opacity-50"
            title={language === 'hi' ? 'लाइव मौसम रीफ्रेश करें' : 'Refresh live weather'}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-300' : ''}`} />
          </button>
        </div>
      </div>

      {/* Collapsible 3-Day Agricultural Forecast */}
      {showForecast && weather && (
        <div className="mt-4 pt-4 border-t border-white/15">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? '3-दिवसीय कृषि एवं मंडी आवक पूर्वानुमान' : '3-Day Agricultural Transit Forecast'}</span>
            </h4>
            <span className="text-[11px] text-zinc-300">
              {language === 'hi' ? 'आर्द्रता' : 'Humidity'}: <strong className="text-white">{weather.humidity}%</strong> |{' '}
              {language === 'hi' ? 'अनुभूत' : 'Feels like'}: <strong className="text-white">{weather.apparentTemperature}°C</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {weather.forecast3Days.map((f, idx) => (
              <div
                key={idx}
                className="bg-black/30 rounded-xl p-3 border border-white/10 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">
                    {language === 'hi' ? f.dayHi : f.dayEn}
                  </div>
                  <div className="text-[11px] text-zinc-300 mt-0.5">
                    {language === 'hi' ? 'अधिकतम' : 'Max'}: <span className="font-semibold text-amber-300">{f.tempMax}°C</span> |{' '}
                    {language === 'hi' ? 'न्यूनतम' : 'Min'}: <span className="font-semibold text-sky-200">{f.tempMin}°C</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-semibold text-sky-300 flex items-center justify-end gap-1">
                    <Droplets className="w-3 h-3" />
                    <span>{f.rainProb}%</span>
                  </div>
                  <div className="text-[10px] text-zinc-300 mt-0.5">
                    {f.rainProb >= 40
                      ? language === 'hi'
                        ? 'वर्षा संभव'
                        : 'Rain Likely'
                      : language === 'hi'
                      ? 'साफ मौसम'
                      : 'Clear Sky'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
