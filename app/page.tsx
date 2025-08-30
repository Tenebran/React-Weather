// app/page.tsx
'use client';
import { useEffect } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import { CurrentWeather, useCurrentWeather } from './hooks/useCurrentWeather';
import { useForecast } from './hooks/useForecast';
import { bgByOwm } from './utils/bgByOwm';
import Image from 'next/image';
import WeatherCurrentCard from './components/WeatherCurrentCard';
export default function Page() {
  const { forecast, error, loading, getForecast } = useForecast();
  const { current, loading: l1, error: e1, getCurrentWeather } = useCurrentWeather();

  useEffect(() => {
    getForecast('Algiers', 'de');
    getCurrentWeather('Algiers', 'de');
  }, []);

  const bgSrc = bgByOwm(current?.owmId, current?.iconCode);

  if (loading) return <p>Lädt...</p>;
  if (error) return <p>Fehler: {error}</p>;

  console.log('forecast', forecast);
  console.log('current', current);
  return (
    <BackgroundVideo src={bgSrc}>
      <div className="min-h-screen w-full px-4 py-6 sm:px-6 lg:px-10 text-white">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl">Погода</h1>

          <form className="flex w-full gap-2 md:w-auto">
            <input
              className="w-full md:w-64 rounded-xl bg-white/10 backdrop-blur px-4 py-2 outline-none
                         placeholder-white/70 focus:ring-2 focus:ring-white/40"
              placeholder="Введите город"
            />
            <button
              className="rounded-xl bg-white/20 px-4 py-2 hover:bg-white/30 transition
                         focus:ring-2 focus:ring-white/40">
              Показать
            </button>
          </form>
        </header>

        <WeatherCurrentCard data={current} />
        <section className="mt-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Прогноз на 5 дней</h2>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="rounded-2xl bg-black/30 backdrop-blur p-4">
                <p className="text-sm opacity-80">Пн</p>
                <p className="mt-1 text-2xl font-bold">+10°</p>
                <p className="opacity-90 mt-1">Дождь</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </BackgroundVideo>
  );
}
