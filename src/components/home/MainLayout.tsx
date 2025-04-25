import { Footer } from "./Footer";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="min-h-dvh overflow-auto flex flex-col md:flex-row-reverse">
      <div className="flex-1 overflow-auto mb-10">{children}</div>
      <div className="md:h-auto md:w-48 shrink-0">
        <Footer />
      </div>
    </main>
  );
};

export default MainLayout;
