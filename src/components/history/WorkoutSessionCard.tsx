import { Session } from "../../models/session";

interface Props {
  session: Session;
  onClick: () => void;
}

export const WorkoutSessionCard = ({ session, onClick }: Props) => {
  const date = new Date(session.startedAt);
  return (
    <div
      className="bg-white text-black p-4 rounded-xl shadow-md mb-4 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-bold mb-1">
        Workout on {date.toLocaleDateString()}
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
    </div>
  );
};
