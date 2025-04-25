import { useState } from "react";
import { useParams } from "react-router";
import { Exercise } from "../../models/exercise";
import { RestTimer } from "./RestTimer";
import { ExerciseLogInput } from "./ExerciseLogInput";
import { WorkoutSummary } from "./WorkoutSummary";
import { useUserData } from "../../context/UserContext";
import { firestoreService } from "../../services/firestoreService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Session } from "../../models/session";

export const ActiveWorkoutScreen = () => {
  const { name } = useParams();
  const { routines, history, setHistory } = useUserData();
  const routine = routines.find((r) => r.name === name);
  const [startTime] = useState(Date.now());
  const [logs, setLogs] = useState<Record<string, { reps: number; weight: number }[]>>({});
  const [finished, setFinished] = useState(false);
  const [user] = useAuthState(auth);
  const [sessionId, setSessionId] = useState<string>("");
  const [note, setNote] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

  if (!routine) return <p className="text-white">Routine not found</p>;
  if (!user) return null;

  const handleLogUpdate = (exercise: Exercise, log: { reps: number; weight: number }[]) => {
    setLogs((prev) => ({ ...prev, [exercise.name]: log }));
  };

  const saveSession = async (sessionData: Session) => {
    try {
      const id = await firestoreService.addSession(sessionData);
      setSessionId(id);
      setHistory([...history, { ...sessionData, id }]);
      setFinished(true);
    } catch (e) {
      console.error("Error saving session:", e);
    }
  };

  return (
    <div className="p-4 text-white space-y-6">
      {finished ? (
        <WorkoutSummary
          startTime={startTime}
          logs={logs}
          sessionId={sessionId}
          note={note}
          photoUrl={photoUrl}
          setNote={setNote}
          setPhotoUrl={setPhotoUrl}
          userUid={user.uid}
          routineId={routine.id}
          saveSession={saveSession}
        />
      ) : (
        <>
          <RestTimer />
          {routine.exercises.map((exercise, i) => (
            <ExerciseLogInput key={i} exercise={exercise} onUpdate={(log) => handleLogUpdate(exercise, log)} />
          ))}

          <button
            onClick={() => setFinished(true)}
            className="w-full bg-green-600 text-white py-3 rounded-full font-semibold"
          >
            Finish Workout
          </button>
        </>
      )}
    </div>
  );
};
