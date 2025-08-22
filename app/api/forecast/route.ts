import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');
  const lang = searchParams.get('lang') || 'de';

  if (!city) return NextResponse.json({ error: 'city is required' }, { status: 400 });

  const key = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    city
  )}&units=metric&lang=${lang}&appid=${key}`;

  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) {
    const text = await r.text();
    return NextResponse.json({ error: text || 'Bad upstream response' }, { status: r.status });
  }
  const data = await r.json();
  return NextResponse.json(data);
}
