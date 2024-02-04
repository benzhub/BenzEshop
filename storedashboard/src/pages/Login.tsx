import { useForm, SubmitHandler } from "react-hook-form";
import { useLogin } from "../features/authentication/useLogin";
import { type UserLogin } from "../types/Auth";
import toast from "react-hot-toast";
import { z } from "zod";
import Spinner from "../ui/Spinner";
import Logo from "../ui/Logo";

const userLoginSchema = z
  .object({
    userName: z
      .string()
      .min(4, "The username characters must be more than 4.")
      .max(20, "The username characters must be fewer than 20."),
    password: z
      .string()
      .min(4, "The password characters must be more than 4.")
      .max(20, "The password characters must be fewer than 20."),
  })
  .strict();

const Login = () => {
  const { isLoggingIn, login } = useLogin();
  const { register, handleSubmit } = useForm<UserLogin>();

  const onSubmit: SubmitHandler<UserLogin> = (data) => {
    const validation = userLoginSchema.safeParse(data);
    if (!validation.success) {
      const { userName, password } = validation.error.format();
      if (userName) toast.error(userName._errors[0]);
      if (password) toast.error(password._errors[0]);
      return;
    }
    login(data);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-[30rem] w-[25rem] rounded-xl bg-neutral p-4">
        <Logo size="w-36" />

        <form
          className="flex flex-col items-center gap-4 pt-[4rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isLoggingIn && <Spinner />}
          {!isLoggingIn && (
            <>
              <input
                id="username"
                type="text"
                placeholder="UserName"
                className="input input-bordered input-primary w-[90%]"
                {...register("userName")}
              />
              <input
                id="password"
                type="password"
                placeholder="PassWord"
                className="input input-bordered input-primary w-[90%]"
                {...register("password")}
              />
              <button className="btn btn-outline btn-primary w-[90%]">
                Login
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
