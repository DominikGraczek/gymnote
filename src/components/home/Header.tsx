import { UserIcon } from "lucide-react";
import { useUserData } from "../../context/UserContext";

export const Header = () => {
  const { userProfile } = useUserData();
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-black text-white">
      <div>
        <h1 className="text-xl font-semibold text-purple-400">
          Hi, {userProfile?.name}
        </h1>
        <p className="text-sm text-gray-300">
          It’s time to challenge your limits.
        </p>
      </div>
      <UserIcon className="w-6 h-6 text-white" />
    </header>
  );
};
