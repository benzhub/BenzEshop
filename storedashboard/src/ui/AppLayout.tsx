import { Outlet } from "react-router-dom";
import { Slidebar } from "./Slidebar";
import { Header } from "./Header";

const AppLayout = () => {
  return (
    <div className="grid h-screen grid-cols-[12rem,1fr] grid-rows-[auto,1fr]">
      <Slidebar />
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
