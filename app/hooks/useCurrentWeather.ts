'use client';

import { useState } from 'react';

export type CurrentWeather = {
  description: string;
  temp: string;
  feels_like: string;
  icon: string;
  speed: number;
  cityName: string;
  humidity: string;
  direction: string;
  deg: number;
  pressure: string;
};

const hPaToMmHg = (hPa: number) => (hPa * 0.75006).toFixed(2);

const getWindDirection = (deg: number) => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  return dirs[Math.round(deg / 45)];
};

export function useCurrentWeather() {
  const [data, setData] = useState<CurrentWeather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentWeather = async (city: string, lang = 'de') => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}&lang=${lang}`);
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();

      setData({
        description: json.weather?.[0]?.description ?? '',
        temp: `${json.main?.temp > 0 ? '+' : ''}${Math.floor(json.main?.temp)}°C`,
        feels_like: `${Math.floor(json.main?.feels_like)}°C`,
        icon: `https://openweathermap.org/img/wn/${json.weather?.[0]?.icon}@4x.png`,
        speed: Math.floor(json.wind?.speed ?? 0),
        cityName: json.name ?? '',
        humidity: `${json.main?.humidity ?? 0}%`,
        direction: getWindDirection(json.wind?.deg ?? 0),
        deg: json.wind?.deg ?? 0,
        pressure: hPaToMmHg(json.main?.pressure ?? 0),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unbekannter Fehler');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { current: data, error, loading, getCurrentWeather };
}
