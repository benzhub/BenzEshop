import { useLogout } from "./useLogout";
import Spinner from "../../ui/Spinner";

const Logout = () => {
  const { logout, isPending } = useLogout();
  return (
    <button
      className="btn btn-outline btn-secondary"
      disabled={isPending}
      onClick={() => {
        logout();
      }}
    >
      {!isPending ? <span className="font-bold">Log out</span> : <Spinner />}
    </button>
  );
};

export default Logout;
