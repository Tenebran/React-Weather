'use client';

export default function WeatherStat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/5 p-3">
      <dt className="text-xs opacity-75">{label}</dt>
      <dd className="text-sm sm:text-base">{value}</dd>
    </div>
  );
}
