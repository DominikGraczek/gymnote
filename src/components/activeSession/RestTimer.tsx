import { useEffect, useState, useCallback } from "react";

const INITIAL_TIME = 120; // 2 minutes in seconds

export const RestTimer = () => {
  const [seconds, setSeconds] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const [vibrationInterval, setVibrationInterval] = useState<NodeJS.Timeout | null>(null);

  const startVibration = useCallback(() => {
    if (vibrationInterval) return;
    
    const interval = setInterval(() => {
      if (navigator.vibrate) {
        navigator.vibrate(1000); // Vibrate for 1 second
      }
    }, 2000); // Repeat every 2 seconds
    
    setVibrationInterval(interval);
    setIsVibrating(true);
  }, [vibrationInterval]);

  const stopVibration = useCallback(() => {
    if (vibrationInterval) {
      clearInterval(vibrationInterval);
      setVibrationInterval(null);
    }
    if (navigator.vibrate) {
      navigator.vibrate(0); // Stop vibration
    }
    setIsVibrating(false);
  }, [vibrationInterval]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      setIsRunning(false);
      startVibration();
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, startVibration]);

  useEffect(() => {
    const handlePowerButton = (e: KeyboardEvent) => {
      if (e.key === 'Power' || e.key === 'PowerOff') {
        stopVibration();
      }
    };

    window.addEventListener('keydown', handlePowerButton);
    return () => window.removeEventListener('keydown', handlePowerButton);
  }, [stopVibration]);

  const resetTimer = () => {
    setSeconds(INITIAL_TIME);
    setIsRunning(false);
    stopVibration();
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-purple-500 rounded-xl p-4 text-center text-white">
      <h2 className="text-xl font-bold mb-2">Rest Timer</h2>
      <div className="text-3xl font-mono mb-4">{formatTime(seconds)}</div>
      <div className="flex justify-center gap-4">
        <button
          className="bg-white text-purple-500 px-4 py-2 rounded"
          onClick={() => setIsRunning(true)}
          disabled={isRunning || seconds === 0}
        >
          Start
        </button>
        <button
          className="bg-white text-purple-500 px-4 py-2 rounded"
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
        >
          Stop
        </button>
        <button
          className="bg-white text-purple-500 px-4 py-2 rounded"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      {isVibrating && (
        <div className="mt-4 text-sm">
          Timer finished! Press power button to stop vibration.
        </div>
      )}
    </div>
  );
};
