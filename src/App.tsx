import { BrowserRouter, Routes, Route } from "react-router";
import MainPage from "./components/home/MainPage";
import { RoutineList } from "./components/routines/RoutineList";
import MainLayout from "./components/home/MainLayout";
import RoutineDetails from "./components/routines/RoutineDetails";
import { CreateRoutineForm } from "./components/routines/CreateRoutineForm";
import { ActiveWorkoutScreen } from "./components/activeSession/ActiveWorkoutScreen";
import { WorkoutHistoryList } from "./components/history/WorkoutHistoryList";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/routines" element={<RoutineList />} />
          <Route path="/routines/:id" element={<RoutineDetails />} />
          <Route path="/routines/new" element={<CreateRoutineForm />} />
          <Route path="/workout/:id" element={<ActiveWorkoutScreen />} />
          <Route path="/history" element={<WorkoutHistoryList />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
