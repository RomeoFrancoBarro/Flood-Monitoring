import React from 'react';

function Forecast({ title, hourly, dt1, dt2, dt3, dt4, dt5, dc1, dc2, dc3, dc4, dc5 }) {
  // Get current date
  const today = new Date();
  // Calculate dates for the next five days
  const nextFiveDays = [...Array(5)].map((_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() + index + 1);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  

  // Calculate times for the next five hours
  const nextFiveHours = [...Array(5)].map((_, index) => {
    const time = new Date(today);
    time.setHours(time.getHours() + index + 1);

    return time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  });


  // Assuming hourlyT is the array containing the hourly time data
  






  console.log('//////////////////////////////////////////////////////'); // Log the hourly data to inspect its structure
  //console.log('Hourly data:', hourlyT); // Log the hourly data to inspect its structure
  //console.log('Hourly data:', hourly);

  


console.log(nextFiveHours[0]);







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





  // Function to GET THE CORRECT HOURS FORECAST BASED ON THE API
  const getCurTimeOnAPI = (indexVal) => {
    switch (indexVal) {
      case "12 AM":
        return 0;
      case "1 AM":
        return 1;
      case "2 AM":
        return 2;
      case "3 AM":
        return 3;
      case "4 AM":
        return 4;
      case "5 AM":
        return 5;
      case "6 AM":
        return 6;
      case "7 AM":
        return 7;
      case "8 AM":
        return 8;
      case "9 AM":
        return 9;
      case "10 AM":
        return 10;
      case "11 AM":
        return 11;
      case "12 PM":
        return 12; // 12 PM corresponds to noon
      case "1 PM":
        return 13; // 1 PM corresponds to 13 hours
      case "2 PM":
        return 14; // 2 PM corresponds to 14 hours
      case "3 PM":
        return 15; // 3 PM corresponds to 15 hours
      case "4 PM":
        return 16; // 4 PM corresponds to 16 hours
      case "5 PM":
        return 17; // 5 PM corresponds to 17 hours
      case "6 PM":
        return 18; // 6 PM corresponds to 18 hours
      case "7 PM":
        return 19; // 7 PM corresponds to 19 hours
      case "8 PM":
        return 20; // 8 PM corresponds to 20 hours
      case "9 PM":
        return 21; // 9 PM corresponds to 21 hours
      case "10 PM":
        return 22; // 10 PM corresponds to 22 hours
      case "11 PM":
        return 23; // 11 PM corresponds to 23 hours
      default:
        return 0;
    }
  };
  






  



  return (
    <div>
      <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium uppercase'>
          {title}
        </p>
      </div>
      <hr className='my-2' />
      <div className='flex flex-row items-center justify-between text-white'>
        {/* Conditionally render hourly forecast */}
        {title === 'hourly forecast' &&
          nextFiveHours.map((time, index) => (
            <HourlyForecast
              key={index}
              time={time}
              iconUrl={getIconUrl(hourly.weatherCode[getCurTimeOnAPI(nextFiveHours[index])])}
              temperature={Math.floor(hourly.temperature2m[getCurTimeOnAPI(nextFiveHours[index])]) + '°'}
            />
          ))}
        {/* Conditionally render daily forecast */}
        {title === "daily forecast" && (
          <>
            <DailyForecast date={nextFiveDays[0]} iconUrl={getIconUrl(dc1)} temperature={Math.floor(dt1) + "°"} />
            <DailyForecast date={nextFiveDays[1]} iconUrl={getIconUrl(dc2)} temperature={Math.floor(dt2) + "°"} />
            <DailyForecast date={nextFiveDays[2]} iconUrl={getIconUrl(dc3)} temperature={Math.floor(dt3) + "°"} />
            <DailyForecast date={nextFiveDays[3]} iconUrl={getIconUrl(dc4)} temperature={Math.floor(dt4) + "°"} />
            <DailyForecast date={nextFiveDays[4]} iconUrl={getIconUrl(dc5)} temperature={Math.floor(dt5) + "°"} />
          </>
        )}
      </div>
    </div>
  );
}

// Component for rendering hourly forecast item
function HourlyForecast({ time, iconUrl, temperature }) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='font-light text-sm'>{time}</p>
      <img src={iconUrl} className='w-12 my-1' alt='' />
      <p className='font-medium'>{temperature}</p>
    </div>
  );
}

// Component for rendering daily forecast item
function DailyForecast({ date, iconUrl, temperature }) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='font-light text-sm'>{date}</p>
      <img src={iconUrl} className='w-12 my-1' alt='' />
      <p className='font-medium'>{temperature}</p>
    </div>
  );
}



export default Forecast;
