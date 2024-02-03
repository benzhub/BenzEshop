import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUser() {
  const { isLoading, data: user, isSuccess: isAuthenticated, isError, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getCurrentUser,
  });
  if(isError) {
    toast.error(error.message);
  }

  return { isLoading, user, isAuthenticated };
}
