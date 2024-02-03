import Logout from "../features/authentication/Logout";
import { useUser } from "../features/authentication/useUser";


export const Header = () => {
  const {userInfo} = useUser();
  return (
    <div className="flex items-center justify-end gap-4 px-4 py-2">
      <div className="avatar placeholder online">
          <div className="w-16 rounded-full bg-neutral text-neutral-content">
            <span className="text-3xl">D</span>
          </div>
        </div>
        <Logout />
    </div>
  );
};
