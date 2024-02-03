// import { useNavigate } from "react-router-dom";
// import { useVerify } from "../features/auth/useVerify";
// import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Slidebar } from "./Slidebar";
import { Header } from "./Header";
import Logout from "../features/authentication/Logout";

const AppLayout = () => {
  return (
    <div className="grid h-screen grid-cols-[12rem,1fr] grid-rows-[auto,1fr]">
      <Slidebar />
      <Header>
        <div className="avatar placeholder online">
          <div className="w-16 rounded-full bg-neutral text-neutral-content">
            <span className="text-3xl">D</span>
          </div>
        </div>
        <Logout />
      </Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
