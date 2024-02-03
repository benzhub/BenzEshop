import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUser() {
  const { isLoading, data: userInfo, isSuccess: isAuthenticated, isError, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false, 
  });
  if(isError) {
    toast.error(error.message);
  }

  return { isLoading, userInfo, isAuthenticated };
}
