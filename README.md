# Overview

This is a simple project that uses the [Open-Meteo](https://open-meteo.com/) free weather API and geolocation search to display current weather.
Built with [React Router](https://reactrouter.com/) and styled with [Material UI](https://mui.com/).

Code writer: Asko Kriiska

## Features

- Search weather by city name or by latitude/longitude
- Geocode city input before fetching forecast data
- Display current temperature, wind speed, and rain status
- Support English and Estonian translations

## Getting Started

### Development and running the application

```bash
npm install
```

Create a local env file from the example:

```bash
cp .env.example .env
```

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Environment variables

Available values:

- `VITE_DEFAULT_LANGUAGE`: default i18n language
- `VITE_GEOCODING_API`: geocoding API base URL
- `VITE_WEATHER_API`: weather API base URL
