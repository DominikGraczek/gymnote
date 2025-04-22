import { useState } from "react";
import { useUserData } from "../../context/UserContext";
import { WorkoutSessionCard } from "./WorkoutSessionCard";
import { WorkoutDetailsModal } from "./WorkoutDetailsModal";
import { Session } from "../../models/session";

export const WorkoutHistoryList = () => {
  const { history } = useUserData();
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Workout History</h2>
      {[...history]
        .sort(
          (a, b) =>
            new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
        )
        .map((session) => (
          <WorkoutSessionCard
            key={session.id}
            session={session}
            onClick={() => setSelectedSession(session)}
          />
        ))}

      {selectedSession && (
        <WorkoutDetailsModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
};
