import { PageLayoutProps } from "../pages/Products";

export const PageLayout = ({ children }: PageLayoutProps) => {
  if (!children) return null;
  return (
    <div className="flex h-full flex-col items-center gap-4 p-4">
      <div className="max-w-[90%]">{children}</div>
    </div>
  );
};
