export function bgByOwm(code?: number, icon?: string): string {
  if (!code) return '/bg/clouds';

  if (code >= 200 && code < 300) return '/bg/thunder';
  if (code >= 300 && code < 400) return '/bg/rain';
  if (code >= 500 && code < 600) return '/bg/rain';
  if (code >= 600 && code < 700) return '/bg/snow';
  if (code >= 700 && code < 800) return '/bg/fog';
  if (code === 800) return icon?.endsWith('n') ? '/bg/clear-night' : '/bg/clear-day';
  if (code > 800 && code < 900) return '/bg/clouds';
  return '/bg/clouds';
}
