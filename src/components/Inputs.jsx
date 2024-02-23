import React, { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

const Inputs = ({ fetchWeather }) => { // Receive fetchWeather function as prop
  const [temperatureUnit, setTemperatureUnit] = useState('fahrenheit'); // State to track temperature unit

  // Function to handle Fahrenheit button click
  const handleFahrenheitClick = () => {
    setTemperatureUnit('fahrenheit'); // Set temperature unit to Fahrenheit
    fetchWeather('fahrenheit'); // Call fetchWeather with Fahrenheit as temperature unit
  };

  // Function to handle Celsius button click
  const handleCelsiusClick = () => {
    setTemperatureUnit('celsius'); // Set temperature unit to Celsius
    fetchWeather('celsius'); // Call fetchWeather with Celsius as temperature unit
  };

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-start space-x-4'></div>

      <div className='flex flex-row w-1/4 items-center justify-end'>
        <button
          name='metric'
          className={`text-xl text-white font-light ${temperatureUnit === 'celsius' ? 'text-gray-500' : ''}`}
          onClick={handleCelsiusClick} // Add onClick event for Celsius button
        >
          °C
        </button>

        <p className='text-xl text-white mx-1'>|</p>

        <button
          name='metric'
          className={`text-xl text-white font-light ${temperatureUnit === 'fahrenheit' ? 'text-gray-500' : ''}`}
          onClick={handleFahrenheitClick} // Add onClick event for Fahrenheit button
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
