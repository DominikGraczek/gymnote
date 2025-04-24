import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
export const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-black text-white">
      <div>
        <h1 className="text-xl font-semibold text-purple-400">
          Hi, {user?.displayName}
        </h1>
        <p className="text-sm text-gray-300">
          It’s time to challenge your limits.
        </p>
      </div>
    </header>
  );
};
