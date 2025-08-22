'use client';

import { useEffect } from 'react';
import { useForecast } from './hooks/useForecast';
import Image from 'next/image';
import { useCurrentWeather } from './hooks/useCurrentWeather';

export default function ForecastWidget() {
  const { forecast, error, loading, getForecast } = useForecast();
  const { current, loading: l1, error: e1, getCurrentWeather } = useCurrentWeather();

  useEffect(() => {
    getForecast('Berlin', 'de');
    getCurrentWeather('Berlin', 'de');
  }, []);

  if (loading) return <p>Lädt...</p>;
  if (error) return <p>Fehler: {error}</p>;

  console.log('forecast', forecast);
  console.log('current', current);

  return (
    <div>
      <h2>Vorhersage</h2>
      <ul>
        {forecast.map((day) => (
          <li key={day.day}>
            <Image src={day.icon} alt={day.day} width={40} height={40} />
            {day.day}: {day.temp}
          </li>
        ))}
      </ul>
    </div>
  );
}
