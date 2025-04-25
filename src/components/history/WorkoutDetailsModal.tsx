import { useParams, useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner";

export const WorkoutDetailsModal = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { history, routines, loading } = useUserData();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;

  const session = history.find((s) => s.id === sessionId);

  if (!session) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <p className="text-2xl font-bold text-red-500 mb-4">
          Workout session not found.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const groupedLogs = session.exercisesDone.reduce<
    Record<string, { reps: number; weight: number }[]>
  >((acc, curr) => {
    if (!acc[curr.name]) acc[curr.name] = [];
    acc[curr.name].push(curr.sets);
    return acc;
  }, {});

  const routine = routines.find((r) => r.id === session.routineId);

  return (
    <div className="p-6 md:p-10 w-full max-w-5xl mx-auto text-black space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-purple-700">
          {routine ? routine.name : "Workout"} Details
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="text-black bg-purple-300 border-1 px-4 py-2 rounded-xl text-md hover:underline"
        >
          Back
        </button>
      </div>
      <section className="bg-purple-100/50 p-6 rounded-2xl space-y-2">
        <p>
          <span className="font-semibold">Started at:</span>{" "}
          {new Date(session.startedAt).toLocaleString()}
        </p>
        {session.endedAt && (
          <p>
            <span className="font-semibold">Duration:</span>{" "}
            {Math.floor(
              (new Date(session.endedAt).getTime() -
                new Date(session.startedAt).getTime()) /
                60000
            )}{" "}
            min
          </p>
        )}
      </section>
      <section className="bg-white p-6 rounded-2xl border space-y-6">
        <h3 className="text-2xl font-bold text-purple-700">Exercises</h3>
        <ul className="space-y-6">
          {Object.entries(groupedLogs).map(([name, sets], index) => (
            <li key={index}>
              <h4 className="text-lg font-semibold mb-1">{name}</h4>
              <div className="space-y-1 text-gray-700">
                {sets.map((set, i) => (
                  <p key={i}>
                    {set.reps} reps × {set.weight} kg
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
      {session.note && (
        <section className="bg-purple-50 p-6 rounded-2xl">
          <h3 className="text-2xl font-bold text-purple-700 mb-2">Note</h3>
          <p className="text-gray-800">{session.note}</p>
        </section>
      )}
      {session.photoUrl && (
        <section className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">Photo</h3>
          <img
            src={session.photoUrl}
            alt="Workout"
            className="w-full max-w-2xl h-auto rounded-2xl object-cover object-center"
          />
        </section>
      )}
    </div>
  );
};
