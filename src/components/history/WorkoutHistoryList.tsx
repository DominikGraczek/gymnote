import { useState, useEffect } from "react";
import { WorkoutSessionCard } from "./WorkoutSessionCard";
import { WorkoutDetailsModal } from "./WorkoutDetailsModal";
import { Session } from "../../models/session";
import { firestoreService } from "../../services/firestoreService";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CircularProgress, Typography } from "@mui/material";

export const WorkoutHistoryList = () => {
  const [user] = useAuthState(auth);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userSessions = await firestoreService.getSessions(user.uid);
        setSessions(userSessions);
      } catch (err) {
        setError('Failed to load workout history');
        console.error('Error fetching sessions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Workout History</h2>
      {sessions.length === 0 ? (
        <Typography className="text-white">No workout sessions found</Typography>
      ) : (
        sessions.map((session) => (
          <WorkoutSessionCard
            key={session.id}
            session={session}
            onClick={() => setSelectedSession(session)}
          />
        ))
      )}

      {selectedSession && (
        <WorkoutDetailsModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
};
