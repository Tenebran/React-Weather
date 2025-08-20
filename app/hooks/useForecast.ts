import { useState } from 'react';
import { ApiResponse, ForecastDay } from '../types/weather';
import { capitalizeFirstLetter } from '../utils/text';
import { getWeatherIcon } from '../utils/icons';

export function useForecast() {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getForecast = async (city: string, lang = 'de') => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/forecast?city=${encodeURIComponent(city)}&lang=${lang}`);
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as ApiResponse;

      const grouped = data.list.reduce<Record<string, { temps: number[]; icon: string }>>(
        (acc, item) => {
          const date = item.dt_txt.split(' ')[0];
          if (!acc[date]) acc[date] = { temps: [], icon: item.weather[0].icon };
          acc[date].temps.push(item.main.temp);
          return acc;
        },
        {}
      );

      const items = Object.entries(grouped).map(([date, { temps, icon }]) => {
        const day = new Date(date).toLocaleDateString(lang, { weekday: 'long' });
        const formattedDay = capitalizeFirstLetter(day);
        const tempMin = Math.min(...temps);
        const tempMax = Math.max(...temps);
        return {
          day: formattedDay,
          icon: getWeatherIcon(icon),
          temp: `${tempMax > 0 ? '+' : ''}${Math.floor(tempMax)}°/${Math.floor(tempMin)}°`,
        };
      });

      setForecast(items.slice(0, 5));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Unbekannter Fehler');
      }
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return { forecast, error, loading, getForecast };
}
