
import { PageLayoutProps } from "../pages/Product";

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  if (!children) return null;
  return (
    <div className="flex h-full flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold">{title}</h1>
          <div className="max-w-[80%]">{children}</div>
    </div>
  );
};
