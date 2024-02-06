import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
  return <div className="m-auto lg:w-[80%] xl:w-[65%] 2xl:w-[60%]">{children}</div>;
};

export default Container;
