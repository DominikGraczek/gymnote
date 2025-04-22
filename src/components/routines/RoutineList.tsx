import { RoutineCard } from "./RoutineCard";
import { useUserData } from "../../context/UserContext";
import { useNavigate } from "react-router";

export const RoutineList = () => {
  const { routines } = useUserData();
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-black mb-6">Your Routines</h1>
      <button
        onClick={() => navigate("/routines/new")}
        className="text-xl w-full text-white p-2  rounded-full mb-5 font-bold bg-purple-500"
      >
        Create new
      </button>
      {routines.map((routine) => (
        <RoutineCard key={routine.id} routine={routine} />
      ))}
    </div>
  );
};
