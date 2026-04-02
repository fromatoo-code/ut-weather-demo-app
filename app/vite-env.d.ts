/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEFAULT_LANGUAGE: string;
  readonly VITE_GEOCODING_API: string;
  readonly VITE_WEATHER_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
