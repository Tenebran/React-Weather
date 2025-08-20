export const getWindDirection = (deg: number) => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  return dirs[Math.round(deg / 45)];
};
