import { useUserData } from "../../context/UserContext";
import { Session } from "../../models/session";

interface Props {
  session: Session;
  onClose: () => void;
}

export const WorkoutDetailsModal = ({ session, onClose }: Props) => {
  const groupedLogs = session.exercisesDone.reduce<Record<string, { reps: number; weight: number }[]>>((acc, curr) => {
    if (!acc[curr.name]) acc[curr.name] = [];
    acc[curr.name].push(curr.sets);
    return acc;
  }, {});
  const { routines } = useUserData();
  const routine = routines.find((r) => r.id === session.routineId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black h-full w-full p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-black text-xl">
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">{routine ? routine.name : "Workout"} Details</h2>
        <p className="text-sm mb-2">Started at: {new Date(session.startedAt).toLocaleString()}</p>
        {session.endedAt && (
          <p className="text-sm mb-4">
            Duration:{" "}
            {Math.floor((new Date(session.endedAt).getTime() - new Date(session.startedAt).getTime()) / 60000)} min
          </p>
        )}

        <ul className="space-y-4">
          {Object.entries(groupedLogs).map(([name, sets], index) => (
            <li key={index} className="border-b pb-2">
              <p className="font-semibold mb-1">{name}</p>
              <div className="space-y-1 text-sm text-gray-700">
                {sets.map((set, i) => (
                  <p key={i}>
                    {set.reps} reps x {set.weight} kg
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {session.note && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Note:</h3>
            <p className="text-sm text-gray-700">{session.note}</p>
          </div>
        )}

        {session.photoUrl && (
          <div className="mt-4">
            <h3 className="w-64 h-64 object-cover rounded-lg max-w-sm">Photo:</h3>
            <img src={session.photoUrl} alt="Workout" className="w-full h-64 object-cover rounded-lg mt-2" />
          </div>
        )}
      </div>
    </div>
  );
};
