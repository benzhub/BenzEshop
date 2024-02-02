import { useMutation } from "@tanstack/react-query";
import { type AuthToken, type UserLogin } from "../../types/Auth";
import { login as apiLogin } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const { mutate: login, isPending: isLoggingIn, isSuccess: isLoginSuccess } = useMutation({
    mutationFn: (userLogin: UserLogin) => apiLogin(userLogin),
    onSuccess: (data: AuthToken) => {
      toast.success("Login successfully!");
      localStorage.setItem('token', data.access);
      localStorage.setItem('refresh', data.refresh);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoggingIn, login, isLoginSuccess };
}
