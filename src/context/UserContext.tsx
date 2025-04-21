import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import {
  getUserData,
  getUserTrainings,
  getWorkoutHistory,
} from "../services/firebaseService";
import { Routine } from "../models/routine";
import { UserProfile } from "../models/user";
import { Session } from "../models/session";

interface UserDataContextType {
  user: User | null;
  userProfile: UserProfile | null;
  routines: Routine[];
  history: Session[];
  loading: boolean;
  refreshTrainings: () => Promise<void>;
  refreshHistory: () => Promise<void>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [history, setHistory] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const profile = await getUserData(firebaseUser.uid);
        const userTrainings = await getUserTrainings(firebaseUser.uid);
        const userHistory = await getWorkoutHistory(firebaseUser.uid);
        setUserProfile(profile as UserProfile);
        setRoutines(userTrainings as Routine[]);
        setHistory(userHistory as Session[]);
      } else {
        setUser(null);
        setUserProfile(null);
        setRoutines([]);
        setHistory([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshTrainings = async () => {
    if (user) {
      const newTrainings = await getUserTrainings(user.uid);
      setRoutines(newTrainings as Routine[]);
    }
  };

  const refreshHistory = async () => {
    if (user) {
      const newHistory = await getWorkoutHistory(user.uid);
      setHistory(newHistory as Session[]);
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        user,
        userProfile,
        routines,
        history,
        loading,
        refreshTrainings,
        refreshHistory,
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
