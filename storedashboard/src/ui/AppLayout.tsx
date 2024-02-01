import { Outlet } from "react-router-dom";

const Header = () => {
  return <div className="border-2 border-white py-4">Header</div>;
};

const Slidebar = () => {
  return <div className="row-start-1 row-end-3 border-2 border-white">Slidebar</div>;
};

const AppLayout = () => {
  return (
    <div className="grid grid-cols-[20rem,1fr] grid-rows-[auto,1fr] h-screen">
      <Slidebar />
      <Header />
      <main className="border-2 border-white overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
