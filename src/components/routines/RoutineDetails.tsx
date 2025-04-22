import { useNavigate, useParams } from "react-router";
import { useUserData } from "../../context/UserContext";
import { MoveLeft } from "lucide-react";

const RoutineDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { routines } = useUserData();
  const routine = routines.find((r) => r.id === id);

  if (!routine) return <p>Routine not found</p>;

  return (
    <div className="p-4 text-white">
      <button
        className="text-purple-400 mb-4 flex gap-x-1"
        onClick={() => navigate("/routines")}
      >
        <MoveLeft /> Back
      </button>

      <h1 className="text-2xl font-bold text-center text-black p-2 mb-6">
        {routine.name}
      </h1>

      <button
        onClick={() => navigate(`/workout/${routine.id}`)}
        className="bg-purple-500 text-white py-3 w-full rounded-full font-semibold mb-6"
      >
        Start Training
      </button>

      <div className="space-y-4">
        {routine.exercises.map((exercise, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 text-black flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{exercise.name}</h2>
              <p>
                {exercise.reps}x{exercise.sets}
              </p>
              <p className="text-xs text-gray-500">
                🔥 Estimated Kcal: {exercise.reps * exercise.sets * 0.5}
              </p>
            </div>
            <div className="text-2xl">🕒</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineDetails;
