import { useEffect, useState } from 'react';

const Timer = ({ time }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [seconds, setSeconds] = useState(time * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        if (!isPaused) {
          if (seconds > 0) {
            setSeconds((seconds) => seconds - 1);
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (isRunning && seconds === 0) {
      setIsComplete(true);
      setIsRunning(false);
    }
  }, [isRunning, seconds]);

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
  };

  const handleStartToggle = () => {
    setIsPaused(false);
    setIsRunning(!isRunning);
    setSeconds(time * 60);
  };

  if (!time) {
    return null;
  }

  const formatSeconds = (seconds) => {
    return new Date(1000 * seconds).toISOString().substr(11, 8);
  };

  return (
    <div>
      <div className="text-7xl py-4 ">{formatSeconds(seconds)}</div>
      <div className="">
        <button onClick={handleStartToggle} className="btn-primary">
          {isRunning ? 'Stop' : 'Start'}
        </button>
        {isRunning && (
          <button onClick={handlePauseToggle} className="btn-secondary mx-4">
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
      </div>

      {isComplete && <p>DONE</p>}
    </div>
  );
};

export default Timer;
