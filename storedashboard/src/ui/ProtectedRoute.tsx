import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate],
  );
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  if (isAuthenticated) return children;
};
