import { useEffect, useState } from "react";
import { firestoreService } from "../../services/firestoreService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useUserData } from "../../context/UserContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Session } from "../../models/session";
import LoadingSpinner from "../LoadingSpinner";
import { ExerciseLog } from "../../models/exerciseLog";

type ChartData = {
  name: string;
  value: number;
};

export const StatsPage = () => {
  const [user] = useAuthState(auth);
  const { routines } = useUserData();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalSets: 0,
    totalReps: 0,
    totalWeight: 0,
  });
  const [radialChartData, setRadialChartData] = useState<ChartData[]>([]);
  console.log(sessions);
  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      try {
        const result = await firestoreService.getSessions(user.uid);
        setSessions(result);

        let totalSets = 0;
        let totalReps = 0;
        let totalWeight = 0;

        const routineCountMap: Record<string, number> = {};

        result.forEach((session: Session) => {
          routineCountMap[session.routineId] =
            (routineCountMap[session.routineId] || 0) + 1;

          session.exercisesDone.forEach((exercise: ExerciseLog) => {
            const s = exercise.sets;
            totalSets += 1;
            totalReps += s.reps;
            totalWeight += s.reps * s.weight;
          });
        });

        setStats({
          totalWorkouts: result.length,
          totalSets,
          totalReps,
          totalWeight,
        });

        const chartData = Object.entries(routineCountMap).map(
          ([routineId, count]) => {
            const routine = routines.find((r) => r.id === routineId);
            return {
              name: routine?.name || "Unknown Routine",
              value: count,
            };
          }
        );

        setRadialChartData(chartData);
      } catch (e) {
        console.error("Error loading stats:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, routines]);

  const COLORS = [
    "#8b5cf6",
    "#f59e0b",
    "#10b981",
    "#ef4444",
    "#3b82f6",
    "#6366f1",
  ];

  if (!user) return;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Training Stats</h1>

      <div className="bg-white rounded-xl p-4 shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Workout Routine Distribution
        </h2>
        {radialChartData.length === 0 ? (
          <p className="text-gray-500">No data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={radialChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                fill="#8884d8"
                label
              >
                {radialChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-white rounded-xl p-4 shadow space-y-2 text-black">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <p>💪 Total Workouts: {stats.totalWorkouts}</p>
        <p>📦 Total Sets: {stats.totalSets}</p>
        <p>🔁 Total Reps: {stats.totalReps}</p>
        <p>🏋️ Total Weight Moved: {stats.totalWeight} kg</p>
      </div>
    </div>
  );
};
