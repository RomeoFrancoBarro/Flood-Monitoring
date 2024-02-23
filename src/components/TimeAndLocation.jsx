import React, { useState, useEffect } from 'react';

function TimeAndLocation({ latitude, longitude }) {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000); // Update time every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  function getCurrentTime() {
    const currentDate = new Date();
    const options = {
      /*weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',*/
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric', // Include seconds
      hour12: true,
    };
    const formattedTime = currentDate.toLocaleString('en-US', options);
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return `${formattedDate} | Local time: ${formattedTime}`;
  }

  function checkCity() {
    let cityName = '';

    if (latitude === 14.5 && longitude === 121.125) {
      cityName = 'Teresa, Rizal';
    } else if (latitude === 14.5181 && longitude === 121.2390) {
      cityName = 'Morong, Rizal';
    }

    return cityName;
  }

  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">{currentTime}</p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{checkCity()}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
