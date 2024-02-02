import { useNavigate } from "react-router-dom";
import { useVerify } from "../features/auth/useVerify";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Slidebar } from "./Slidebar";
import { Header } from "./Header";
import Spinner from "./Spinner";

const AppLayout = () => {
  const navigate = useNavigate();
  const { isVerifyError, isVerifing } = useVerify();
  useEffect(() => {
    if (isVerifyError) {
      navigate("/login");
    }
  }, [isVerifyError, navigate]);
  if(isVerifing) return <div className="h-screen flex justify-center items-center"><Spinner/></div>
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
