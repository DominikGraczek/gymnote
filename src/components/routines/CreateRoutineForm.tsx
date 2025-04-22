// CreateRoutineForm.tsx
import { useState } from "react";
import { Routine } from "../../models/routine";
import { Exercise } from "../../models/exercise";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";
import { useUserData } from "../../context/UserContext";

export const CreateRoutineForm = () => {
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseInput, setExerciseInput] = useState({
    name: "",
    sets: "",
    reps: "",
  });

  const { userProfile, routines, setRoutines } = useUserData();
  const navigate = useNavigate();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userProfile) return;

    const newRoutine: Routine = {
      id: uuidv4(),
      uid: userProfile.uid,
      name: routineName,
      exercises,
    };

    setRoutines([...routines, newRoutine]);
    navigate("/routines");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-4 bg-white rounded-xl shadow-md my-10"
    >
      <h2 className="text-xl font-bold mb-4">Create New Routine</h2>

      <input
        type="text"
        placeholder="Routine Name"
        value={routineName}
        onChange={(e) => setRoutineName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Add Exercise</h3>
        <input
          type="text"
          placeholder="Exercise Name"
          value={exerciseInput.name}
          onChange={(e) =>
            setExerciseInput({ ...exerciseInput, name: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Sets"
            value={exerciseInput.sets}
            onChange={(e) =>
              setExerciseInput({
                ...exerciseInput,
                sets: e.target.value,
              })
            }
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Reps"
            value={exerciseInput.reps}
            onChange={(e) =>
              setExerciseInput({
                ...exerciseInput,
                reps: e.target.value,
              })
            }
            className="w-1/2 p-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleAddExercise}
          className="mt-2 bg-purple-500 text-white py-2 px-4 rounded"
        >
          Add Exercise
        </button>
      </div>

      {exercises.length > 0 && (
        <ul className="mb-4 list-disc list-inside text-sm">
          {exercises.map((ex, i) => (
            <li key={i}>
              {ex.name} - {ex.sets} sets x {ex.reps} reps @ {ex.weight}kg
            </li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded font-semibold"
      >
        Save Routine
      </button>
    </form>
  );
};
