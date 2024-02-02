import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const Header = () => {
  const naviagate = useNavigate();
  
  function handleLogout() {
    localStorage.setItem('token', "");
    localStorage.setItem('refresh', "");
    toast.success("Logout successfully!");
    naviagate("/login")
  }
  return (
    <div className="flex items-center justify-end gap-4 px-4 py-2">
      
      <div className="avatar placeholder online">
        <div className="w-16 rounded-full bg-neutral text-neutral-content">
          <span className="text-3xl">D</span>
        </div>
      </div>
      <button className="btn btn-outline btn-secondary" onClick={handleLogout}>
        <span className="font-bold">Log out</span>
      </button>
    </div>
  );
};
