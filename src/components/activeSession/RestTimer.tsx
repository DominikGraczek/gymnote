import { useEffect, useState } from "react";

export const RestTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
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
        >
          Start
        </button>
        <button
          className="bg-white text-purple-500 px-4 py-2 rounded"
          onClick={() => setIsRunning(false)}
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
    </div>
  );
};
