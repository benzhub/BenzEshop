import { PropsWithChildren } from "react";



export const Header = ({children}: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-end gap-4 px-4 py-2">
      {children}
    </div>
  );
};
