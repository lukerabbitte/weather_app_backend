# Express Weather API

Express Weather API is a RESTful API built with Node.js and Express that provides weather and geocoding data from OpenWeatherMap and city photos from Unsplash. This API is designed to serve as the back-end for a weather forecasting [application](https://github.com/lukerabbitte/vue_weather_app).

## Available Endpoints

- /geocoding: Retrieves coordinates based on a city name.

- /weather: Fetches weather data based on coordinates, with options for language and units.

- /air_pollution: Provides air pollution data based on coordinates.

- /unsplash_photos: Retrieves city photos from Unsplash.

## Usage
The Express Weather API is designed to be used as the back-end for a weather forecasting application. You can make requests to the available endpoints to fetch data for your application.

Make sure to include your OpenWeatherMap and Unsplash API keys in the respective endpoint URLs for proper data retrieval.