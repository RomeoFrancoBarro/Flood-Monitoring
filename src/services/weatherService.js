import { fetchWeatherApi } from 'openmeteo';



const params = {
    latitude: 14.5181,
    longitude: 121.2390,
    current: ["relative_humidity_2m", "apparent_temperature", "is_day", "weather_code", "wind_speed_10m"],
    hourly: ["apparent_temperature", "weather_code"],
    daily: ["weather_code", "apparent_temperature_max", "apparent_temperature_min"],
    timezone: "GMT"
};
const url = "https://api.open-meteo.com/v1/forecast";
  
// Assuming 'fetchWeatherApi' is available globally
const responses = await fetchWeatherApi(url, params);
  
// Helper function to form time ranges
const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  
// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];
  
// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();
  
const current = response.current();
const hourly = response.hourly();
const daily = response.daily();
  


// './services/weatherService'
const weatherService = () => {
  // Your existing code here

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
      current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          relativeHumidity2m: current.variables(0).value(),
          apparentTemperature: current.variables(1).value(),
          isDay: current.variables(2).value(),
          weatherCode: current.variables(3).value(),
          windSpeed10m: current.variables(4).value(),
      },
      hourly: {
          time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          apparentTemperature: hourly.variables(0).valuesArray(),
          weatherCode: hourly.variables(1).valuesArray(),
      },
      daily: {
          time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          weatherCode: daily.variables(0).valuesArray(),
          apparentTemperatureMax: daily.variables(1).valuesArray(),
          apparentTemperatureMin: daily.variables(2).valuesArray(),
      },
  };

  // `weatherData` now contains a simple structure with arrays for datetime and weather data

  console.log(weatherData.current);
  console.log(response.latitude());
  console.log(response.longitude());

  for (let i = 0; i < weatherData.hourly.time.length; i++) {
      console.log(
          weatherData.hourly.time[i].toISOString(),
          weatherData.hourly.apparentTemperature[i],
          weatherData.hourly.weatherCode[i]
      )
  }

  for (let i = 0; i < weatherData.daily.time.length; i++) {
      console.log(
          weatherData.daily.time[i].toISOString(),
          weatherData.daily.weatherCode[i],
          weatherData.daily.apparentTemperatureMax[i],
          weatherData.daily.apparentTemperatureMin[i]
      );
  }

  // Return the weatherData
  return { ...weatherData, latitude, longitude };
};

// Exporting the weatherService function as default
export default weatherService;


  
