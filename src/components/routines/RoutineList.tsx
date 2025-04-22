import { useEffect, useState } from "react";
import { RoutineCard } from "./RoutineCard";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { firestoreService } from "../../services/firestoreService";
import { Routine } from "../../models/routine";
import { useUserData } from "../../context/UserContext";

export const RoutineList = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { routines, setRoutines, loading, setLoading } = useUserData();

  useEffect(() => {
    const fetchRoutines = async () => {
      if (!user) return;
      try {
        const result = await firestoreService.getRoutines(user.uid);
        setRoutines(result);
      } catch (e) {
        console.error("Failed to fetch routines:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, [user]);

  if (!user) return null;
  if (loading) return <p className="p-4">Loading routines...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-black mb-6">Your Routines</h1>
      <button
        onClick={() => navigate("/routines/new")}
        className="text-xl w-full text-white p-2 rounded-full mb-5 font-bold bg-purple-500"
      >
        Create new
      </button>

      {routines.length === 0 ? (
        <p className="text-gray-500">No routines yet.</p>
      ) : (
        routines.map((routine) => (
          <RoutineCard key={routine.name} routine={routine} />
        ))
      )}
    </div>
  );
};
