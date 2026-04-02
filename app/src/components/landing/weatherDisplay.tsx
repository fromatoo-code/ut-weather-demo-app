import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import type { WeatherErrorCode, WeatherForecast } from '@src/hooks/useLocationForm';

type WeatherDisplayProps = {
  readonly errorCode: WeatherErrorCode | null;
  readonly weather: WeatherForecast | null;
};

// https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
const rainWeatherCodes = new Set([
  // Recent rain / mixed precipitation observed
  20, 21, 23, 24, 25, 27,
  // Drizzle and freezing drizzle
  50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  // Rain, freezing rain, and rain-snow mix
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
  // Rain and sleet showers
  80, 81, 82, 83, 84,
  // Thunderstorms with rain / hail
  91, 92, 95, 96, 97, 98, 99,
]);

export function WeatherDisplay({ errorCode, weather }: WeatherDisplayProps) {
  const { t } = useTranslation();

  if (!weather?.current && !errorCode) {
    return (
      <Box
        sx={{
          minHeight: 150,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          bgcolor: 'grey.100',
        }}
      />
    );
  }

  if (errorCode || !weather?.current) {
    return (
      <Box
        sx={{
          minHeight: 150,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
        }}
      >
        <Typography variant='body2' color='error'>
          {t(`errors.${errorCode ?? 'WEATHER_SEARCH_FAILED'}`)}
        </Typography>
      </Box>
    );
  }

  const weatherCode = weather.current?.weather_code;
  const isRaining = rainWeatherCodes.has(weatherCode ?? -1);
  const rainLabel = isRaining
    ? t(`forecast.weatherCodes.${weatherCode ?? 'unknown'}`, {
        defaultValue: t('forecast.rain.raining'),
      })
    : t('forecast.rain.notRaining');

  return (
    <Box
      sx={{
        minHeight: 180,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 2,
      }}
    >
      {weather.cityName && (
        <Typography variant='h5' sx={{ mb: 0.5 }}>
          {weather.cityName}
        </Typography>
      )}
      <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
        {t('forecast.title')}
      </Typography>
      <Typography variant='body2'>
        {t('forecast.temperature', { value: weather.current.temperature_2m ?? '-' })}
      </Typography>
      <Typography variant='body2'>
        {t('forecast.windSpeed', { value: weather.current.wind_speed_10m ?? '-' })}
      </Typography>
      <Typography variant='body2'>
        {t('forecast.rain.status', { status: rainLabel })}
      </Typography>
    </Box>
  );
}
