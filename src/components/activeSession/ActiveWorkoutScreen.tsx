import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Exercise } from "../../models/exercise";
import { RestTimer } from "./RestTimer";
import { ExerciseLogInput } from "./ExerciseLogInput";
import { WorkoutSummary } from "./WorkoutSummary";
import { useUserData } from "../../context/UserContext";
import { v4 as uuidv4 } from "uuid";

export const ActiveWorkoutScreen = () => {
  const { id } = useParams();
  const { routines, userProfile, history, setHistory } = useUserData();
  const routine = routines.find((r) => r.id === id);
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);
  const [logs, setLogs] = useState<
    Record<string, { reps: number; weight: number }[]>
  >({});
  const [finished, setFinished] = useState(false);

  if (!routine) return <p className="text-white">Routine not found</p>;

  const handleLogUpdate = (
    exercise: Exercise,
    log: { reps: number; weight: number }[]
  ) => {
    setLogs((prev) => ({ ...prev, [exercise.name]: log }));
  };

  const handleFinishWorkout = () => {
    const newSession = {
      id: uuidv4(),
      uid: userProfile?.uid || "anonymous",
      trainingId: routine.id,
      startedAt: new Date(startTime).toISOString(),
      endedAt: new Date().toISOString(),
      exercisesDone: Object.entries(logs).flatMap(([name, sets]) =>
        sets.map((s) => ({ name, sets: s }))
      ),
    };
    setHistory([...history, newSession]);
    setEndTime(Date.now());
    setFinished(true);
  };

  return (
    <div className="p-4 text-white space-y-6">
      {finished ? (
        <WorkoutSummary startTime={startTime} logs={logs} />
      ) : (
        <>
          <RestTimer />
          {routine.exercises.map((exercise, i) => (
            <ExerciseLogInput
              key={i}
              exercise={exercise}
              onUpdate={(log) => handleLogUpdate(exercise, log)}
            />
          ))}

          <button
            onClick={handleFinishWorkout}
            className="w-full bg-green-600 text-white py-3 rounded-full font-semibold"
          >
            Finish Workout
          </button>
        </>
      )}
    </div>
  );
};
