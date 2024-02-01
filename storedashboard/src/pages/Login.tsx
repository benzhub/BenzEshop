import Logo from "../ui/Logo";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-[30rem] w-[25rem] rounded-xl bg-neutral p-4">
        <Logo size="w-36"/>

        <form className="flex flex-col items-center gap-4 pt-[4rem]">
          <input
            type="text"
            placeholder="UserName"
            className="input input-bordered input-primary w-[90%]"
          />
          <input
            type="text"
            placeholder="PassWord"
            className="input input-bordered input-primary w-[90%]"
          />
          <button className="btn btn-outline btn-primary w-[90%]">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
