import { Footer } from "./Footer";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="h-dvh overflow-hidden flex flex-col md:flex-row">
      <Footer /> <div className="flex-1 overflow-auto">{children}</div>
    </main>
  );
};

export default MainLayout;
