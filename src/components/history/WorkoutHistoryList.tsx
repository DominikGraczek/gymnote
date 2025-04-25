import { WorkoutSessionCard } from "./WorkoutSessionCard";
import LoadingSpinner from "../LoadingSpinner";
import { useUserData } from "../../context/UserContext";

export const WorkoutHistoryList = () => {
  const { history, loading } = useUserData();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4 text-white">Workout History</h2>

      {history.length === 0 ? (
        <p className="text-black w-full text-center">
          No workout sessions found
        </p>
      ) : (
        history
          .slice()
          .sort(
            (a, b) =>
              new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
          )
          .map((session) => (
            <WorkoutSessionCard key={session.id} session={session} />
          ))
      )}
    </div>
  );
};
