import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
// import { User, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/firebaseConfig";
// import {
//   getUserData,
//   getUserTrainings,
//   getWorkoutHistory,
// } from "../services/firebaseService";
import { Routine } from "../models/routine";
import { UserProfile } from "../models/user";
import { Session } from "../models/session";

import { mockRoutines, mockSessions, mockUserProfile } from "../mockdata";

interface UserDataContextType {
  // user: User | null;
  // setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  routines: Routine[];
  setRoutines: React.Dispatch<React.SetStateAction<Routine[]>>;
  history: Session[];
  setHistory: React.Dispatch<React.SetStateAction<Session[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // refreshTrainings: () => Promise<void>;
  // refreshHistory: () => Promise<void>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(
    mockUserProfile
  );
  const [routines, setRoutines] = useState<Routine[]>(mockRoutines);
  const [history, setHistory] = useState<Session[]>(mockSessions);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  //     if (firebaseUser) {
  //       setUser(firebaseUser);
  //       const profile = await getUserData(firebaseUser.uid);
  //       const userTrainings = await getUserTrainings(firebaseUser.uid);
  //       const userHistory = await getWorkoutHistory(firebaseUser.uid);
  //       setUserProfile(profile as UserProfile);
  //       setRoutines(userTrainings as Routine[]);
  //       setHistory(userHistory as Session[]);
  //     } else {
  //       setUser(null);
  //       setUserProfile(null);
  //       setRoutines([]);
  //       setHistory([]);
  //     }
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  // const refreshTrainings = async () => {
  //   if (user) {
  //     const newTrainings = await getUserTrainings(user.uid);
  //     setRoutines(newTrainings as Routine[]);
  //   }
  // };

  // const refreshHistory = async () => {
  //   if (user) {
  //     const newHistory = await getWorkoutHistory(user.uid);
  //     setHistory(newHistory as Session[]);
  //   }
  // };

  return (
    <UserDataContext.Provider
      value={{
        // user,
        // setUser,
        userProfile,
        setUserProfile,
        routines,
        setRoutines,
        history,
        setHistory,
        loading,
        setLoading,
        // refreshTrainings,
        // refreshHistory,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
