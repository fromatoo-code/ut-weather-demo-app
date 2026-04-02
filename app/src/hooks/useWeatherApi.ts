import * as React from 'react';

import env from '@src/config/env';
import type { CityOption, WeatherErrorCode, WeatherForecast } from '@src/hooks/useLocationForm';

type GeocodingResponse = {
  results?: Array<{
    id?: number;
    name: string;
    country?: string;
    admin1?: string;
    latitude: number;
    longitude: number;
  }>;
};

type UseWeatherApiArgs = {
  searching: boolean;
  city: string;
  latitude: number | null;
  longitude: number | null;
  language: string;
  onCityOptions: (options: CityOption[]) => void;
  onWeather: (weather: WeatherForecast) => void;
  onError: (code: WeatherErrorCode) => void;
};

export function useWeatherApi({
  searching,
  city,
  latitude,
  longitude,
  language,
  onCityOptions,
  onWeather,
  onError,
}: UseWeatherApiArgs) {
  React.useEffect(() => {
    if (!searching) {
      return;
    }

    const abortController = new AbortController();

    const run = async () => {
      const isGeocodingSearch = city.trim() && (latitude === null || longitude === null);
      const isWeatherSearch = latitude !== null && longitude !== null;

      try {
        if (isGeocodingSearch) {
          const geocodingUrl = new URL(env.geocodingApi);
          geocodingUrl.searchParams.set('name', city.trim());
          geocodingUrl.searchParams.set('count', '10');
          geocodingUrl.searchParams.set('language', language || env.defaultLanguage || 'en');
          geocodingUrl.searchParams.set('format', 'json');

          const geocodingResponse = await fetch(geocodingUrl, {
            signal: abortController.signal,
          });

          if (!geocodingResponse.ok) {
            onError('GEOCODING_REQUEST_FAILED');
            return;
          }

          const geocodingData =
            (await geocodingResponse.json()) as GeocodingResponse;

          const options: CityOption[] = (geocodingData.results ?? []).map((result) => ({
            id: String(result.id ?? `${result.name}-${result.latitude}-${result.longitude}`),
            name: result.name,
            country: result.country,
            admin1: result.admin1,
            latitude: result.latitude,
            longitude: result.longitude,
          }));

          onCityOptions(options);
          return;
        }

        if (isWeatherSearch) {
          const weatherUrl = new URL(env.weatherApi);
          weatherUrl.searchParams.set('latitude', String(latitude));
          weatherUrl.searchParams.set('longitude', String(longitude));
          weatherUrl.searchParams.set('current', 'temperature_2m,wind_speed_10m,weather_code');
          weatherUrl.searchParams.set('timezone', 'auto');

          const weatherResponse = await fetch(weatherUrl, {
            signal: abortController.signal,
          });

          if (!weatherResponse.ok) {
            onError('WEATHER_REQUEST_FAILED');
            return;
          }

          const weatherData = (await weatherResponse.json()) as WeatherForecast;
          onWeather({
            ...weatherData,
            cityName: city.trim() || undefined,
          });
          return;
        }

        onError('INVALID_LOCATION');
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        console.error('Weather API request failed', error);

        if (isGeocodingSearch) {
          onError('GEOCODING_REQUEST_FAILED');
          return;
        }

        if (isWeatherSearch) {
          onError('WEATHER_REQUEST_FAILED');
          return;
        }

        onError('WEATHER_SEARCH_FAILED');
      }
    };

    void run();

    return () => {
      abortController.abort();
    };
  }, [
    city,
    language,
    latitude,
    longitude,
    onCityOptions,
    onError,
    onWeather,
    searching,
  ]);
}
