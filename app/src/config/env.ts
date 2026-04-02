const defaultLanguage = import.meta.env.SSR
  ? process.env.VITE_DEFAULT_LANGUAGE
  : import.meta.env.VITE_DEFAULT_LANGUAGE;

const geocodingApi = import.meta.env.SSR
  ? process.env.VITE_GEOCODING_API
  : import.meta.env.VITE_GEOCODING_API;

const weatherApi = import.meta.env.SSR
  ? process.env.VITE_WEATHER_API
  : import.meta.env.VITE_WEATHER_API;

const env = {
  defaultLanguage: defaultLanguage || "en",
  geocodingApi: geocodingApi || "",
  weatherApi: weatherApi || "",
} as const;

export default env;
