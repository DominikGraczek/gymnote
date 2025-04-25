import { useUserData } from "../../context/UserContext";
import { Session } from "../../models/session";
import { Link } from "react-router";

interface Props {
  session: Session;
}

export const WorkoutSessionCard = ({ session }: Props) => {
  const { routines } = useUserData();
  const routine = routines.find((r) => r.id === session.routineId);
  const date = new Date(session.startedAt);

  return (
    <Link
      to={`/history/${session.id}`}
      className="block bg-white text-black p-4 rounded-xl shadow-md mb-4 cursor-pointer hover:bg-gray-100 transition"
    >
      <h3 className="text-lg font-bold mb-1">
        {routine ? routine.name : "Workout"} on {date.toLocaleDateString()}
      </h3>
      <p className="text-sm">Started at: {date.toLocaleTimeString()}</p>
      {session.endedAt && (
        <p className="text-sm text-gray-500">
          Duration:{" "}
          {Math.floor(
            (new Date(session.endedAt).getTime() - date.getTime()) / 60000
          )}{" "}
          min
        </p>
      )}
    </Link>
  );
};
