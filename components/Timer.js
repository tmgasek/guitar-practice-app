import { useEffect, useState } from 'react';
import { IoPlay, IoPause, IoStop } from 'react-icons/io5';

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
      <h3 className="text-7xl sm:text-9xl">{formatSeconds(seconds)}</h3>
      <div className="flex justify-center items-center gap-4">
        <button onClick={handleStartToggle} className="btn-primary">
          {isRunning ? <IoStop /> : <IoPlay />}
        </button>
        {isRunning && (
          <button onClick={handlePauseToggle} className="btn-secondary py-2">
            {isPaused ? <IoPlay /> : <IoPause />}
          </button>
        )}
      </div>

      {isComplete && <p>DONE</p>}
    </div>
  );
};

export default Timer;
