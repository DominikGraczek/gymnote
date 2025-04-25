import { ExerciseLog } from "./exerciseLog";

export type Session = {
  id: string;
  uid: string; // owner
  routineId: string; // what training it was
  startedAt: string;
  endedAt?: string;
  exercisesDone: ExerciseLog[];
  photoUrl?: string | null;
  note?: string;
};
