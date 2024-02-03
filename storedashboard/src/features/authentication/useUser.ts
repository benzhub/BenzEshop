import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user, isSuccess: isAuthenticated } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated };
}
