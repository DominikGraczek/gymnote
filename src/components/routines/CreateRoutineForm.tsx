import { useState } from "react";
import { Routine } from "../../models/routine";
import { Exercise } from "../../models/exercise";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { firestoreService } from "../../services/firestoreService";
import { useUserData } from "../../context/UserContext";

export const CreateRoutineForm = () => {
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseInput, setExerciseInput] = useState({
    name: "",
    sets: "",
    reps: "",
  });
  const { routines, setRoutines } = useUserData();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleAddExercise = () => {
    const { name, sets, reps } = exerciseInput;
    if (name && sets && reps) {
      setExercises([
        ...exercises,
        {
          name,
          sets: parseInt(sets),
          reps: parseInt(reps),
        },
      ]);
      setExerciseInput({ name: "", sets: "", reps: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newRoutine: Routine = {
      id: uuidv4(),
      uid: user.uid,
      name: routineName,
      exercises,
    };

    try {
      await firestoreService.addRoutine(newRoutine);
      setRoutines([...routines, newRoutine]);
      navigate("/routines");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-11/12 bg-gray-50 px-4 py-6 flex flex-col">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
        🏋️ Create New Routine
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-grow">
        <input
          type="text"
          placeholder="Routine name"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <div className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">Add Exercise</h3>
          <input
            type="text"
            placeholder="Exercise name"
            value={exerciseInput.name}
            onChange={(e) =>
              setExerciseInput({ ...exerciseInput, name: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Sets"
              value={exerciseInput.sets}
              onChange={(e) =>
                setExerciseInput({ ...exerciseInput, sets: e.target.value })
              }
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Reps"
              value={exerciseInput.reps}
              onChange={(e) =>
                setExerciseInput({ ...exerciseInput, reps: e.target.value })
              }
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleAddExercise}
            className="w-full mt-2 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
          >
            Add Exercise
          </button>
        </div>

        {exercises.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border text-sm text-gray-700">
            <h4 className="font-semibold mb-2">📋 Exercise List</h4>
            <ul className="list-disc list-inside space-y-1">
              {exercises.map((ex, i) => (
                <li key={i}>
                  {ex.name} – {ex.sets} sets × {ex.reps} reps
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto space-y-2">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600"
          >
            Save Routine
          </button>
          <button
            type="button"
            onClick={() => navigate("/routines")}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
