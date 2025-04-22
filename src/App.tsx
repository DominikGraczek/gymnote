import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import MainPage from "./components/home/MainPage";
import { RoutineList } from "./components/routines/RoutineList";
import MainLayout from "./components/home/MainLayout";
import RoutineDetails from "./components/routines/RoutineDetails";
import { CreateRoutineForm } from "./components/routines/CreateRoutineForm";
import { ActiveWorkoutScreen } from "./components/activeSession/ActiveWorkoutScreen";
import { WorkoutHistoryList } from "./components/history/WorkoutHistoryList";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./components/settingsPage/settings";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginForm />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterForm />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } />
          <Route path="/routines" element={
            <ProtectedRoute>
              <RoutineList />
            </ProtectedRoute>
          } />
          <Route path="/routines/:id" element={
            <ProtectedRoute>
              <RoutineDetails />
            </ProtectedRoute>
          } />
          <Route path="/routines/new" element={
            <ProtectedRoute>
              <CreateRoutineForm />
            </ProtectedRoute>
          } />
          <Route path="/workout/:id" element={
            <ProtectedRoute>
              <ActiveWorkoutScreen />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <WorkoutHistoryList />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
