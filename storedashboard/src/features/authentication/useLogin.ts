import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AuthToken, type UserLogin } from "../../types/Auth";
import { login as apiLogin } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingIn, isSuccess: isLoginSuccess } = useMutation({
    mutationFn: (userLogin: UserLogin) => apiLogin(userLogin),
    onSuccess: (user: AuthToken) => {
      toast.success("Login successfully!");
      queryClient.setQueryData(['token'], user);
      localStorage.setItem('token', user.access);
      localStorage.setItem('refresh', user.refresh);
      navigate('/dashboard', { replace: true });
    },
    onError: () => {
      // console.log('Error', err);
      toast.error('Provided email or password are incorrect')
    },
  });

  return { isLoggingIn, login, isLoginSuccess };
}
