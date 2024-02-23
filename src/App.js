import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButton from './components/TopButton';

import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import weatherService from './services/weatherService2';

import React, { useState, useEffect } from 'react';
import WaterLevelTable from './components/WaterLevelTable';

function App() {

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await weatherService();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    // Function to fetch weather data initially and refresh it every few seconds
    const fetchDataAndUpdate = async () => {
      await fetchWeather();
      // Refresh weather data every 300 seconds (5 minutes)
      setInterval(fetchWeather, 300000);
    };
  
    // Fetch weather data initially and set up automatic refreshing
    fetchDataAndUpdate();
  
    // Clean up function
    return () => {
      // Clear the interval when the component unmounts
      clearInterval(fetchDataAndUpdate);
    };
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg lg:mt-4 py-5 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      {/*<TopButton/>*/}
      {weatherData && (
        <div>
          <TimeAndLocation latitude={weatherData.latitude} longitude={weatherData.longitude} />
          <TemperatureAndDetails temperature={weatherData.current.temperature2m} 
                                  humidity={weatherData.current.relativeHumidity2m} 
                                  wind={weatherData.current.windSpeed10m} 
                                  appTemperature={weatherData.current.apparentTemperature} 
                                  weatherCode={weatherData.current.weatherCode} 
                                  rise={weatherData.current.sunrise}
                                  high={weatherData.daily.apparentTemperatureMax[1]} 
                                  low={weatherData.daily.apparentTemperatureMin[1]}/> 

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-2">
              <WaterLevelTable /> {/* Render WaterLevelTable on the left side */}
            </div>
            <div className="md:w-1/2 md:pl-2">
              <Forecast title="hourly forecast" data={weatherData.hourly} hourly={weatherData.hourly} hourlyT={weatherData.hourly.time}/> {/* Render hourly forecast on the top right */}
              <Forecast title="daily forecast" data={weatherData.daily} 
                                            dt1={weatherData.daily.temperature2mMax[2]}
                                            dt2={weatherData.daily.temperature2mMax[3]}
                                            dt3={weatherData.daily.temperature2mMax[4]}
                                            dt4={weatherData.daily.temperature2mMax[5]}
                                            dt5={weatherData.daily.temperature2mMax[6]}
                                            dc1={weatherData.daily.weatherCode[2]}
                                            dc2={weatherData.daily.weatherCode[3]}
                                            dc3={weatherData.daily.weatherCode[4]}
                                            dc4={weatherData.daily.weatherCode[5]}
                                            dc5={weatherData.daily.weatherCode[6]}  />{/* Render daily forecast on the bottom right */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
