import React from 'react'
import {

    UilArrowUp, 
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,     

} from '@iconscout/react-unicons'




// Function to map weather code to weather description
function getWeatherDescription(code) {
    switch (code) {
        case 0:
            return 'Clear sky';
        case 1:
            return 'Mainly clear'
        case 2:
            return 'Partly Cloudy'
        case 3:
            return 'Overcast';
        case 45:
            return 'Fog'
        case 48:
            return 'Depositing Rime Fog';
        case 51:
            return 'Drizzle: Light'
        case 53:
            return 'Drizzle: Moderate'
        case 55:
            return 'Drizzle: Dense Intensity';
        case 56:
            return 'Freezing Drizzle: Light'
        case 57:
            return 'Freezing Drizzle: Dense Intensity';
        case 61:
            return 'Rain: Slight'
        case 63:
            return 'Rain: Moderate'
        case 65:
            return 'Rain: Heavy Intensity';
        case 66:
            return 'Freezing Rain: Light'
        case 67:
            return 'Freezing Rain: Heavy Intensity';
        case 71:
            return 'Snow fall: Slight'
        case 73:
            return 'Snow fall: Moderate'
        case 75:
            return 'Snow fall: Heavy Intensity';
        case 77:
            return 'Snow grains';
        case 80:
            return 'Rain showers: Slight'
        case 81:
            return 'Rain showers: Moderate'
        case 82:
            return 'Rain showers: Violent';
        case 85:
            return 'Snow showers Slight'
        case 86:
            return 'Snow showers Heavy';
        default:
            return 'Unknown';
    }
}


// Function to map weather codes to icon URLs
const getIconUrl = (weatherCode) => {
    switch (weatherCode) {
      case 0:
        return "http://openweathermap.org/img/wn/01d@2x.png"; // Clear sky
      case 1:
      case 2:
      case 3:
        return "http://openweathermap.org/img/wn/02d@2x.png"; // Mainly clear, partly cloudy, overcast
      case 45:
      case 48:
        return "http://openweathermap.org/img/wn/50d@2x.png"; // Fog and depositing rime fog
      case 51:
      case 53:
      case 55:
        return "http://openweathermap.org/img/wn/10d@2x.png"; // Drizzle: Light, moderate, dense intensity
      case 56:
      case 57:
        return "http://openweathermap.org/img/wn/13d@2x.png"; // Freezing Drizzle: Light, dense intensity
      case 61:
      case 63:
      case 65:
        return "http://openweathermap.org/img/wn/09d@2x.png"; // Rain: Slight, moderate, heavy intensity
      case 66:
      case 67:
        return "http://openweathermap.org/img/wn/13d@2x.png"; // Freezing Rain: Light, heavy intensity
      case 71:
      case 73:
      case 75:
      case 77:
        return "http://openweathermap.org/img/wn/13d@2x.png"; // Snow fall: Slight, moderate, heavy intensity, snow grains
      case 80:
      case 81:
      case 82:
        return "http://openweathermap.org/img/wn/09d@2x.png"; // Rain showers: Slight, moderate, violent
      case 85:
      case 86:
        return "http://openweathermap.org/img/wn/13d@2x.png"; // Snow showers: Slight, heavy
      default:
        return "http://openweathermap.org/img/wn/01d@2x.png"; // Default to clear sky icon
    }
  };











function TemperatureAndDetails({ temperature, humidity, wind, appTemperature, weatherCode, high, low }) {

  return (
    <div>

        <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>

            <p>{getWeatherDescription(weatherCode)}</p>
            
        </div>

        <div className='flex flex-row items-center justify-between text-white py-3'>
            <img src={getIconUrl(weatherCode)} alt="Weather Icon" />

            <p className='text-5xl'> {Math.floor(temperature)}°</p>

            <div className='flex flex-col space-y-2'> 

                <div className='flex font-light text-sm items-center justify-center'>
                    <UilTemperature size={18} className='mr-1'/>
                    Real feel: 
                    <span className='font-medium ml-1'>{Math.floor(appTemperature)}°</span>
                </div>

                <div className='flex font-light text-sm items-center justify-center'>
                    <UilTear size={18} className='mr-1'/>
                    Humidity:  
                    <span className='font-medium ml-1'>{humidity}%</span>
                </div>

                <div className='flex font-light text-sm items-center justify-center'>
                    <UilWind size={18} className='mr-1'/>
                    Wind:
                    <span className='font-medium ml-1'>{Math.floor(wind)} km/h</span>
                </div>

            </div>

        </div>

        <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>

            

            <UilArrowUp/>
            <p className='font-light'>
                High: <span className='font-medium ml-1'>{Math.floor(high)}°</span>
            </p>
            <p className='font-light'>|</p>

            <UilArrowDown/>
            <p className='font-light'>
                Low: <span className='font-medium ml-1'>{Math.floor(low)}°</span>
            </p>
            

        </div>

        

    </div>
  )
}

export default TemperatureAndDetails


