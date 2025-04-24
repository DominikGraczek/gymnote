import {
  History,
  DumbbellIcon,
  HomeIcon,
  ClipboardListIcon,
  Settings,
} from "lucide-react";
import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  icon: ReactElement;
  label: string;
  to: string;
}

const NavItem = ({ icon, label, to }: NavItemProps) => (
  <Link
    to={to}
    className="flex flex-col md:flex-row items-center gap-1 text-sm hover:text-purple-600"
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
  </Link>
);

export const Footer = () => {
  const location = useLocation();
  const hide =
    location.pathname === "/login" || location.pathname === "/register";

  if (hide) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 md:static md:w-48 md:h-full bg-purple-100 flex md:flex-col justify-between md:justify-start items-center px-4 py-3 md:py-6 md:gap-6 text-black shadow-lg z-50">
      <NavItem icon={<History />} label="History" to="/history" />
      <NavItem icon={<DumbbellIcon />} label="Routines" to="/routines" />
      <NavItem icon={<HomeIcon />} label="Home" to="/" />
      <NavItem icon={<ClipboardListIcon />} label="Statistics" to="/stats" />
      <NavItem icon={<Settings />} label="Settings" to="/settings" />
    </footer>
  );
};
