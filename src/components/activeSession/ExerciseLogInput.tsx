// ExerciseLogInput.tsx
import { useState } from "react";
import { Exercise } from "../../models/exercise";

interface ExerciseLogInputProps {
  exercise: Exercise;
  onUpdate: (sets: { reps: number; weight: number }[]) => void;
}

export const ExerciseLogInput = ({
  exercise,
  onUpdate,
}: ExerciseLogInputProps) => {
  const [sets, setSets] = useState<{ reps: number; weight: number }[]>([
    {
      reps: exercise.reps,
      weight: exercise.weight ?? 0,
    },
  ]);

  const handleChange = (
    index: number,
    key: "reps" | "weight",
    value: number
  ) => {
    const updatedSets = [...sets];
    updatedSets[index][key] = value;
    setSets(updatedSets);
    onUpdate(updatedSets);
  };

  const addSet = () => {
    const newSet = { reps: exercise.reps ?? 0, weight: exercise.weight ?? 0 };
    const updated = [...sets, newSet];
    setSets(updated);
    onUpdate(updated);
  };

  return (
    <div className="bg-white text-black rounded-xl p-4">
      <h2 className="font-semibold mb-2">{exercise.name}</h2>
      {sets.map((set, i) => (
        <div key={i} className="flex items-center gap-2 mb-2">
          <span className="text-sm">Set {i + 1}</span>
          <input
            type="number"
            value={set.weight}
            onChange={(e) =>
              handleChange(i, "weight", parseFloat(e.target.value))
            }
            className="w-1/4 p-1 border rounded"
            placeholder="Weight"
          />
          kg x
          <input
            type="number"
            value={set.reps}
            onChange={(e) => handleChange(i, "reps", parseInt(e.target.value))}
            className="w-1/4 p-1 border rounded"
            placeholder="Reps"
          />
          reps
        </div>
      ))}
      <button
        type="button"
        className="text-sm mt-2 text-purple-600 underline"
        onClick={addSet}
      >
        + Add Set
      </button>
    </div>
  );
};
