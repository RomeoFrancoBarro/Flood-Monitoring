import { fetchWeatherApi } from 'openmeteo';

const weatherService = async (latitude = 14.5181, longitude = 121.2390, temperatureUnit = "celsius") => {
    const params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "weather_code", "wind_speed_10m"],
        "hourly": ["temperature_2m", "weather_code"],
        "daily": ["weather_code", "temperature_2m_max", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset"],
        "timezone": "GMT",
        "temperature_unit": temperatureUnit,
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start, stop, step) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();

    const current = response.current();
    const hourly = response.hourly();
    const daily = response.daily();

    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0).value(),
            relativeHumidity2m: current.variables(1).value(),
            apparentTemperature: current.variables(2).value(),
            weatherCode: current.variables(3).value(),
            windSpeed10m: current.variables(4).value(),
        },
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
            weatherCode: hourly.variables(1).valuesArray(),
        },
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: daily.variables(0).valuesArray(),
            temperature2mMax: daily.variables(1).valuesArray(),
            apparentTemperatureMax: daily.variables(2).valuesArray(),
            apparentTemperatureMin: daily.variables(3).valuesArray(),
            sunrise: daily.variables(4).valuesArray(),
            sunset: daily.variables(5).valuesArray(),
        },
    };

    console.log("=====================================================");
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
        console.log(
            weatherData.hourly.time[i].toISOString(),
            weatherData.hourly.temperature2m[i],
            weatherData.hourly.weatherCode[i]
        );
    }

    // Return the weatherData
    return { ...weatherData, latitude, longitude };
};

// Exporting the weatherService function as default
export default weatherService;
