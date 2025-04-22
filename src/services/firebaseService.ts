// import { db } from "../firebase/firebaseConfig";
// import {
//   doc,
//   getDoc,
//   collection,
//   getDocs,
//   query,
//   where,
//   addDoc,
// } from "firebase/firestore";
// import { Routine } from "../models/routine";
// import { Session } from "react-router";

// export const getUserData = async (uid: string) => {
//   const docRef = doc(db, "users", uid);
//   const docSnap = await getDoc(docRef);
//   return docSnap.exists() ? docSnap.data() : null;
// };

// export const getUserTrainings = async (uid: string) => {
//   const q = query(collection(db, "trainings"), where("uid", "==", uid));
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

// export const getWorkoutHistory = async (uid: string) => {
//   const q = query(collection(db, "workoutSessions"), where("uid", "==", uid));
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

// export const createTrainingRoutine = async (trainingData: Routine) => {
//   const trainingRef = await addDoc(collection(db, "trainings"), trainingData);
//   return trainingRef.id;
// };
// export const saveWorkoutSession = async (sessionData: Session) => {
//   const sessionRef = await addDoc(
//     collection(db, "workoutSessions"),
//     sessionData
//   );
//   return sessionRef.id;
// };
