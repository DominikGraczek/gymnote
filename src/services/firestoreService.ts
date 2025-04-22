import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { Session } from '../models/session';
import { Routine } from '../models/routine';
import { Exercise } from '../models/exercise';
import { auth } from '../firebase';

export const firestoreService = {
  
  // Sessions
  async getSessions(userId: string): Promise<Session[]> {
    const sessionsRef = collection(db, 'sessions');
    const q = query(
      sessionsRef,
      where('uid', '==', userId),
      orderBy('startedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Session));
  },

  async addSession(session: Omit<Session, 'id'>): Promise<string> {
    const sessionsRef = collection(db, 'sessions');
    const docRef = await addDoc(sessionsRef, session);
    return docRef.id;
  },

  async updateSession(sessionId: string, updates: Partial<Session>): Promise<void> {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, updates);
  },

  // Routines
  async getRoutines(userId: string): Promise<Routine[]> {
    const routinesRef = collection(db, 'routines');
    const q = query(
      routinesRef,
      where('uid', '==', userId),
      orderBy('name')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Routine));
  },

  async addRoutine(routine: Omit<Routine, 'id'>): Promise<string> {
    const routinesRef = collection(db, 'routines');
    const docRef = await addDoc(routinesRef, routine);
    return docRef.id;
  },

  async updateRoutine(routineId: string, updates: Partial<Routine>): Promise<void> {
    const routineRef = doc(db, 'routines', routineId);
    await updateDoc(routineRef, updates);
  },

  async deleteRoutine(routineId: string): Promise<void> {
    const routineRef = doc(db, 'routines', routineId);
    await deleteDoc(routineRef);
  },

  // Exercises
  async getExercises(userId: string): Promise<Exercise[]> {
    const exercisesRef = collection(db, 'exercises');
    const q = query(
      exercisesRef,
      where('uid', '==', userId),
      orderBy('name')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exercise));
  },

  async addExercise(exercise: Omit<Exercise, 'id'>): Promise<string> {
    const exercisesRef = collection(db, 'exercises');
    const docRef = await addDoc(exercisesRef, exercise);
    return docRef.id;
  },

  async updateExercise(exerciseId: string, updates: Partial<Exercise>): Promise<void> {
    const exerciseRef = doc(db, 'exercises', exerciseId);
    await updateDoc(exerciseRef, updates);
  },

  async deleteExercise(exerciseId: string): Promise<void> {
    const exerciseRef = doc(db, 'exercises', exerciseId);
    await deleteDoc(exerciseRef);
  }
}; 