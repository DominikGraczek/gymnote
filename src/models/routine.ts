import { Exercise } from "./exercise";

export type Routine = {
  id: string;
  uid: string; //owner
  name: string;
  exercises: Exercise[];
};
