// import { useNavigate } from "react-router-dom";
// import { useVerify } from "../features/auth/useVerify";
// import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Slidebar } from "./Slidebar";
import { Header } from "./Header";

const AppLayout = () => {
  return (
    <div className="grid h-screen grid-cols-[12rem,1fr] grid-rows-[auto,1fr]">
      <Slidebar />
      <Header/>
      <main className="overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
