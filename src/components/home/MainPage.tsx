import { Header } from "./Header";
import { LastWorkoutAndRecommendation } from "./LastWorkoutAndRecomendation";

const MainPage = () => {
  return (
    <main className="h-dvh overflow-hidden">
      <Header />
      <LastWorkoutAndRecommendation />
    </main>
  );
};

export default MainPage;
