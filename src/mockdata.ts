// mockUserProfile.ts
export const mockUserProfile = {
  uid: "user123",
  name: "domin",
  lastName: "dominlastnaem",
  email: "domin@example.com",
  isAuth: true,
};

// mockExercises.ts

import { Exercise } from "./models/exercise";
export const mockExercises: Exercise[] = [
  { name: "Bench Press", sets: 4, reps: 10, weight: 80 },
  { name: "Deadlift", sets: 3, reps: 6, weight: 100 },
  { name: "Squat", sets: 4, reps: 8, weight: 90 },
  { name: "Pull Ups", sets: 3, reps: 12, weight: 0 },
  { name: "Bicep Curl", sets: 3, reps: 15, weight: 20 },
];

// mockExerciseLogs.ts
import { ExerciseLog } from "./models/exerciseLog";
export const mockExerciseLogs: ExerciseLog[] = [
  { name: "Bench Press", sets: { reps: 10, weight: 80 } },
  { name: "Deadlift", sets: { reps: 6, weight: 100 } },
  { name: "Squat", sets: { reps: 8, weight: 90 } },
];

// mockRoutines.ts
import { Routine } from "./models/routine";
export const mockRoutines: Routine[] = [
  {
    id: "routine1",
    uid: "user123",
    name: "Split Strength Training",
    exercises: mockExercises.slice(0, 3),
  },
  {
    id: "routine2",
    uid: "user123",
    name: "Upper Body",
    exercises: mockExercises.slice(0, 2),
  },
  {
    id: "routine3",
    uid: "user123",
    name: "Pull Out",
    exercises: mockExercises.slice(3),
  },
];

// mockSessions.ts
import { Session } from "./models/session";
export const mockSessions: Session[] = [
  {
    id: "session1",
    uid: "user123",
    trainingId: "routine1",
    startedAt: "2025-04-20T10:00:00Z",
    endedAt: "2025-04-20T10:45:00Z",
    exercisesDone: mockExerciseLogs,
  },
  {
    id: "session2",
    uid: "user123",
    trainingId: "routine2",
    startedAt: "2025-04-18T09:30:00Z",
    endedAt: "2025-04-18T10:15:00Z",
    exercisesDone: mockExerciseLogs,
  },
];

// mockProgressPhotos.ts
import { ProgressPhoto } from "./models/progressPhoto";
export const mockProgressPhotos: ProgressPhoto[] = [
  {
    id: "photo1",
    uid: "user123",
    photoUrl: "https://via.placeholder.com/150",
    addedAt: "2025-04-01T12:00:00Z",
    note: "Start of month progress",
  },
  {
    id: "photo2",
    uid: "user123",
    photoUrl: "https://via.placeholder.com/150",
    addedAt: "2025-04-15T12:00:00Z",
    note: "Mid-month check",
  },
];
