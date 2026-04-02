import * as React from 'react';

export type CityOption = {
  id: string;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

export type WeatherForecast = {
  cityName?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  current?: {
    time: string;
    temperature_2m?: number;
    wind_speed_10m?: number;
    rain?: number;
    weather_code?: number;
  };
};

export type WeatherErrorCode =
  | 'GEOCODING_REQUEST_FAILED'
  | 'WEATHER_REQUEST_FAILED'
  | 'INVALID_LOCATION'
  | 'WEATHER_SEARCH_FAILED'
  | 'NO_MATCHING_CITIES';

type LocationFormState = {
  city: string;
  latitude: number | null;
  longitude: number | null;
  searching: boolean;
  cityDisabled: boolean;
  coordinatesDisabled: boolean;
  cityOptions: CityOption[];
  weather: WeatherForecast | null;
  errorCode: WeatherErrorCode | null;
};

type LocationFormAction =
  | { type: 'setCity'; value: string }
  | { type: 'setLatitude'; value: number | null }
  | { type: 'setLongitude'; value: number | null }
  | { type: 'setCityOptions'; value: CityOption[] }
  | { type: 'dismissCityOptions' }
  | { type: 'selectCityOption'; value: CityOption }
  | { type: 'setWeather'; value: WeatherForecast }
  | { type: 'setError'; value: WeatherErrorCode }
  | { type: 'clear' }
  | { type: 'search' };

function getDerivedState(
  state: Pick<LocationFormState, 'city' | 'latitude' | 'longitude' | 'searching'>,
): Pick<LocationFormState, 'cityDisabled' | 'coordinatesDisabled'> {
  if (state.searching) {
    return {
      cityDisabled: true,
      coordinatesDisabled: true,
    };
  }

  return {
    cityDisabled: state.latitude !== null || state.longitude !== null,
    coordinatesDisabled: state.city.trim().length > 0,
  };
}

const initialState: LocationFormState = {
  city: '',
  latitude: null,
  longitude: null,
  searching: false,
  cityDisabled: false,
  coordinatesDisabled: false,
  cityOptions: [],
  weather: null,
  errorCode: null,
};

const reducer = (
  state: LocationFormState,
  action: LocationFormAction,
): LocationFormState => {
  switch (action.type) {
    case 'setCity':
      return {
        ...state,
        city: action.value,
        latitude: action.value.trim() ? null : state.latitude,
        longitude: action.value.trim() ? null : state.longitude,
        searching: false,
        cityOptions: [],
        weather: null,
        errorCode: null,
        ...getDerivedState({
          city: action.value,
          latitude: action.value.trim() ? null : state.latitude,
          longitude: action.value.trim() ? null : state.longitude,
          searching: false,
        }),
      };
    case 'setLatitude':
      return {
        ...state,
        city: action.value !== null ? '' : state.city,
        latitude: action.value,
        longitude: state.longitude,
        searching: false,
        cityOptions: [],
        weather: null,
        errorCode: null,
        ...getDerivedState({
          city: action.value !== null ? '' : state.city,
          latitude: action.value,
          longitude: state.longitude,
          searching: false,
        }),
      };
    case 'setLongitude':
      return {
        ...state,
        city: action.value !== null ? '' : state.city,
        latitude: state.latitude,
        longitude: action.value,
        searching: false,
        cityOptions: [],
        weather: null,
        errorCode: null,
        ...getDerivedState({
          city: action.value !== null ? '' : state.city,
          latitude: state.latitude,
          longitude: action.value,
          searching: false,
        }),
      };
    case 'setCityOptions':
      return {
        ...state,
        searching: false,
        cityOptions: action.value,
        weather: null,
        errorCode: action.value.length === 0 ? 'NO_MATCHING_CITIES' : null,
        ...getDerivedState({
          city: state.city,
          latitude: state.latitude,
          longitude: state.longitude,
          searching: false,
        }),
      };
    case 'dismissCityOptions':
      return {
        ...state,
        cityOptions: [],
        errorCode: null,
      };
    case 'selectCityOption':
      return {
        ...state,
        city: action.value.name,
        latitude: action.value.latitude,
        longitude: action.value.longitude,
        searching: true,
        cityOptions: [],
        weather: null,
        errorCode: null,
        ...getDerivedState({
          city: action.value.name,
          latitude: action.value.latitude,
          longitude: action.value.longitude,
          searching: true,
        }),
      };
    case 'setWeather':
      return {
        ...state,
        searching: false,
        cityOptions: [],
        weather: action.value,
        errorCode: null,
        ...getDerivedState({
          city: state.city,
          latitude: state.latitude,
          longitude: state.longitude,
          searching: false,
        }),
      };
    case 'setError':
      return {
        ...state,
        searching: false,
        errorCode: action.value,
        ...getDerivedState({
          city: state.city,
          latitude: state.latitude,
          longitude: state.longitude,
          searching: false,
        }),
      };
    case 'clear':
      return initialState;
    case 'search':
      if (!state.city.trim() && (state.latitude === null || state.longitude === null)) {
        return state;
      }

      return {
        ...state,
        searching: true,
        ...getDerivedState({
          city: state.city,
          latitude: state.latitude,
          longitude: state.longitude,
          searching: true,
        }),
      };
    default:
      return state;
  }
}

export function useLocationForm() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const canSearch = Boolean(
    state.city.trim() || (state.latitude !== null && state.longitude !== null),
  );

  return {
    state,
    cityDisabled: state.cityDisabled,
    coordinatesDisabled: state.coordinatesDisabled,
    canSearch,
    setCity: (value: string) => dispatch({ type: 'setCity', value }),
    setLatitude: (value: number | null) => dispatch({ type: 'setLatitude', value }),
    setLongitude: (value: number | null) => dispatch({ type: 'setLongitude', value }),
    setCityOptions: (value: CityOption[]) => dispatch({ type: 'setCityOptions', value }),
    dismissCityOptions: () => dispatch({ type: 'dismissCityOptions' }),
    selectCityOption: (value: CityOption) => dispatch({ type: 'selectCityOption', value }),
    setWeather: (value: WeatherForecast) => dispatch({ type: 'setWeather', value }),
    setError: (value: WeatherErrorCode) => dispatch({ type: 'setError', value }),
    clear: () => dispatch({ type: 'clear' }),
    search: () => dispatch({ type: 'search' }),
  };
}
