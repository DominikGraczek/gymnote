import { RoutineCard } from "./RoutineCard";
import { useNavigate } from "react-router";
import { useUserData } from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner";

export const RoutineList = () => {
  const navigate = useNavigate();

  const { routines, loading } = useUserData();

  if (loading) return <LoadingSpinner />;

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
