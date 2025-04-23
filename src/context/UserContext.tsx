import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
// import { User, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/firebaseConfig";
// import {
//   getUserData,
//   getUserTrainings,
//   getWorkoutHistory,
// } from "../services/firebaseService";
import { Routine } from "../models/routine";
import { Session } from "../models/session";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { firestoreService } from "../services/firestoreService";

interface UserDataContextType {
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

  const [routines, setRoutines] = useState<Routine[]>([]);
  const [history, setHistory] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const fetchRoutines = async () => {
      if (!user) return;
      try {
        const result = await firestoreService.getRoutines(user.uid);
        setRoutines(result);
      } catch (e) {
        console.error("Failed to fetch routines:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, [user]);
  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const userSessions = await firestoreService.getSessions(user.uid);
        setHistory(userSessions);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [user]);
  return (
    <UserDataContext.Provider
      value={{
        // user,
        // setUser,
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
