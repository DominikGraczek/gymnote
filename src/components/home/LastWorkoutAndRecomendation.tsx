import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { firestoreService } from "../../services/firestoreService";
import { useUserData } from "../../context/UserContext";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

export const LastWorkoutAndRecommendation = () => {
  const [user] = useAuthState(auth);
  const { routines, setRoutines } = useUserData();
  const [lastSession, setLastSession] = useState<any | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [summary, setSummary] = useState({ sets: 0, reps: 0, weight: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchLastSession = async () => {
      const fetchroutines = await firestoreService.getRoutines(user.uid);
      setRoutines(fetchroutines);
      const sessions = await firestoreService.getSessions(user.uid);
      if (sessions.length === 0) return;

      const sorted = sessions.sort(
        (a, b) => dayjs(b.startedAt).valueOf() - dayjs(a.startedAt).valueOf()
      );

      const latest = sorted[0];
      setLastSession(latest);

      let totalSets = 0;
      let totalReps = 0;
      let totalWeight = 0;

      latest.exercisesDone.forEach((ex: any) => {
        totalSets += 1;
        totalReps += ex.sets.reps;
        totalWeight += ex.sets.reps * ex.sets.weight;
      });

      setSummary({ sets: totalSets, reps: totalReps, weight: totalWeight });

      const lastRoutine = routines.find((r) => r.id === latest.routineId);
      const lastName = lastRoutine?.name.toLowerCase();

      let next = routines[Math.floor(Math.random() * routines.length)]?.name;

      setRecommendation(next);
    };

    fetchLastSession();
  }, []);

  if (!user || !lastSession)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No recent workout found.</p>
      </div>
    );

  const routine = routines.find((r) => r.id === lastSession.routineId);
  const duration = lastSession.endedAt
    ? dayjs(lastSession.endedAt).diff(dayjs(lastSession.startedAt), "minute")
    : "N/A";

  return (
    <div className="flex items-center justify-center h-3/4">
      <div className="bg-white text-black rounded-2xl shadow-xl w-full  p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-2">🏋️ Last Workout</h2>

        <div className="bg-gray-100 rounded-xl p-4 space-y-2">
          <p>
            <span className="font-semibold">Routine:</span>{" "}
            {routine?.name || "Unknown"}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {dayjs(lastSession.startedAt).format("MMMM D, YYYY – HH:mm")}
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {duration} min
          </p>
          <p>
            <span className="font-semibold">Total Sets:</span> {summary.sets}
          </p>
          <p>
            <span className="font-semibold">Total Reps:</span> {summary.reps}
          </p>
          <p>
            <span className="font-semibold">Total Weight:</span>{" "}
            {summary.weight} kg
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-purple-600">
            🎯 Recommended Next Workout
          </h3>
          <div
            onClick={() => navigate(`routines/${recommendation}`)}
            className="bg-purple-100 text-purple-800 rounded-xl px-4 py-2 text-center font-bold"
          >
            {recommendation}
          </div>
        </div>
      </div>
    </div>
  );
};
