export type ForecastDay = { day: string; icon: string; temp: string };

export type ApiResponse = {
  list: Array<{
    dt_txt: string;
    main: { temp: number };
    weather: Array<{ icon: string }>;
  }>;
};

export type CurrentWeatherType = {
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
