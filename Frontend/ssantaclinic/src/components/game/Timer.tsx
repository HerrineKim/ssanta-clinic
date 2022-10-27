import React, { useState, useEffect, useRef } from 'react';

export default function Timer() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const record = useRef<number>(0);
  record.current = timeElapsed;
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 30);
    }, 30);
    return () => {
      alert('Your Record :' + record.current / 1000);
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="timer-container">
      <div>{Math.floor(timeElapsed / 1000)}:</div>
      <div>{(timeElapsed % 1000) / 10}</div>
    </div>
  );
}
