import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next';

import { LocationForm } from '@src/components/landing/form';
import { WeatherDisplay } from '@src/components/landing/weatherDisplay';
import { useLocationForm } from '@src/hooks/useLocationForm';
import { useWeatherApi } from '@src/hooks/useWeatherApi';

export const Landing = () => {
  const { i18n } = useTranslation();
  const {
    state,
    cityDisabled,
    coordinatesDisabled,
    canSearch,
    setCity,
    setLatitude,
    setLongitude,
    setCityOptions,
    dismissCityOptions,
    selectCityOption,
    setWeather,
    setError,
    clear,
    search,
  } = useLocationForm();

  useWeatherApi({
    searching: state.searching,
    city: state.city,
    latitude: state.latitude,
    longitude: state.longitude,
    language: i18n.resolvedLanguage ?? 'en',
    onCityOptions: setCityOptions,
    onWeather: setWeather,
    onError: setError,
  });

  return (
   <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '100vh', px: 2, py: 3 }}
    >
      <Box sx={{ display: 'grid', gap: 2, width: '100%', maxWidth: 560 }}>
        <WeatherDisplay errorCode={state.errorCode} weather={state.weather} />
        <LocationForm
          city={state.city}
          latitude={state.latitude}
          longitude={state.longitude}
          cityDisabled={cityDisabled}
          coordinatesDisabled={coordinatesDisabled}
          canSearch={canSearch}
          searching={state.searching}
          cityOptions={state.cityOptions}
          error={null}
          onCityChange={setCity}
          onLatitudeChange={setLatitude}
          onLongitudeChange={setLongitude}
          onSearch={search}
          onClear={clear}
          onDismissCityOptions={dismissCityOptions}
          onSelectCityOption={selectCityOption}
        />
      </Box>
    </Grid>
  )
}
