'use client';
import { CurrentWeather } from '../hooks/useCurrentWeather';
import Image from 'next/image';
import WeatherStat from './WeatherStat';

export default function WeatherCurrentCard({ data }: { data: CurrentWeather | null }) {
  return (
    <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="relative rounded-2xl bg-black/35 backdrop-blur p-4 sm:p-5 md:p-6">
        <Image
          src={data?.icon ?? ''}
          alt={data?.description ?? 'Weather Icon'}
          width={124}
          height={124}
          className="absolute top-4 right-4 rounded-full bg-white/10 backdrop-blur"
        />

        <p className="text-sm sm:text-base opacity-90 pr-20 sm:pr-24">{data?.cityName}</p>

        <div className="mt-1 flex items-end gap-3 pr-20 sm:pr-24">
          <span className="text-4xl sm:text-5xl md:text-6xl font-bold">{data?.temp}</span>
        </div>

        <span className="text-sm sm:text-base opacity-80 pr-20 sm:pr-24">
          ощущается {data?.feels_like}
        </span>

        <p className="mt-2 text-base sm:text-lg capitalize pr-20 sm:pr-24">{data?.description}</p>

        <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          <WeatherStat label="Ветер" value={`${data?.speed} м/с, ${data?.direction}`} />
          <WeatherStat label="Влажность" value={data?.humidity} />
          <WeatherStat label="Давление" value={`${data?.pressure} мм`} />
        </dl>
      </div>
    </section>
  );
}
