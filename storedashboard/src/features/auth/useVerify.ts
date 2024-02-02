import { useQuery } from "@tanstack/react-query";
import { verifyToken } from "../../services/apiAuth";

export function useVerify() {
  const {isLoading: isVerifing, data: userInfo, isError: isVerifyError, error, isSuccess: isVerifySuccess} = useQuery({
    queryKey: ["userInfo"],
    queryFn: verifyToken,
    refetchOnMount: false
  });
  return { isVerifing, userInfo, isVerifyError, error, isVerifySuccess };
}
