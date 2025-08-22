'use client';

import { useEffect } from 'react';
import { useForecast } from './hooks/useForecast';
import Image from 'next/image';
import { useCurrentWeather } from './hooks/useCurrentWeather';
import { bgByOwm } from './utils/bgByOwm';
import BackgroundVideo from './components/BackgroundVideo';

export default function ForecastWidget() {
  const { forecast, error, loading, getForecast } = useForecast();
  const { current, loading: l1, error: e1, getCurrentWeather } = useCurrentWeather();

  useEffect(() => {
    getForecast('Berlin', 'de');
    getCurrentWeather('Berlin', 'de');
  }, []);

  const bgSrc = bgByOwm((current as any)?.owmId, (current as any)?.iconCode);

  if (loading) return <p>Lädt...</p>;
  if (error) return <p>Fehler: {error}</p>;

  console.log('forecast', forecast);
  console.log('current', current);

  return (
    <BackgroundVideo src={bgSrc}>
      <main className="p-6 text-white">
        {current ? (
          <>
            <h1 className="text-3xl">{current.cityName}</h1>
            <p>{current.description}</p>
            <p>
              {current.temp} ( {current.feels_like})
            </p>
          </>
        ) : (
          <p></p>
        )}
      </main>
    </BackgroundVideo>
  );
}
