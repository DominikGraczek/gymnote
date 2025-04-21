import { ExerciseLog } from "./exerciseLog";

export type Session = {
  id: string;
  uid: string; // owner
  trainingId: string; // what training it was
  startedAt: string;
  endedAt?: string;
  exercisesDone: ExerciseLog[];
};
