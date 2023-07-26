import React, { useState, useEffect } from 'react';

const ClockComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Set up an interval to update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format the time as desired (e.g., HH:mm:ss)
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div>
      <p>{formattedTime}</p>
    </div>
  );
};

export default ClockComponent;
