import { Routine } from "../../models/routine";
import { useNavigate } from "react-router";

interface RoutineCardProps {
  routine: Routine;
}

export const RoutineCard = ({ routine }: RoutineCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/routines/${routine.name}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white shadow-md rounded-2xl p-4 w-full  mx-auto mb-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <h2 className="text-lg font-semibold text-black mb-2">{routine.name}</h2>
      <ul className="text-sm text-gray-600">
        {routine.exercises.map((exercise, index) => (
          <li key={index}>
            {exercise.name} - {exercise.sets} sets x {exercise.reps} reps x{" "}
            {exercise.weight}kg
          </li>
        ))}
      </ul>
    </div>
  );
};
