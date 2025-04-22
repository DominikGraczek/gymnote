import { useNavigate } from "react-router";
interface WorkoutSummaryProps {
  startTime: number;
  endTime?: number;
  logs: Record<string, { reps: number; weight: number }[]>;
}

export const WorkoutSummary = ({
  startTime,
  endTime,
  logs,
}: WorkoutSummaryProps) => {
  const elapsed = endTime
    ? Math.floor((endTime - startTime) / 1000)
    : Math.floor((Date.now() - startTime) / 1000);
  const navigate = useNavigate();
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const calculateCalories = () => {
    let total = 0;
    Object.values(logs).forEach((sets) => {
      sets.forEach(({ reps, weight }) => {
        total += (reps * weight) / 2;
      });
    });
    return total.toFixed(1);
  };

  return (
    <div>
      <div className="bg-purple-600 text-white rounded-xl p-4 mt-6 text-center">
        <h2 className="text-xl font-bold mb-2">Workout Summary</h2>
        <p className="mb-1">⏱ Duration: {formatTime(elapsed)}</p>
        <p>🔥 Calories Burned: {calculateCalories()} kcal</p>
      </div>
      <button
        className="text-black flex gap-x-2 font-bold bg-gray-300 px-4 py-2 rounded-full mx-auto mt-5"
        onClick={() => navigate("/")}
      >
        Go home
      </button>
    </div>
  );
};
