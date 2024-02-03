import { NavLink } from "react-router-dom";
import { ReactNode } from "react";

type SlideBarLinkProps = {
  to: string;
  title: string;
  icon: ReactNode;
};

export const SlideBarLink = ({ to, title, icon }: SlideBarLinkProps) => {
  return (
    <NavLink
      to={to}
      className="tooltip tooltip-right flex items-center"
      data-tip={title}
    >
      {icon}
      <span className="font-bold">{title}</span>
    </NavLink>
  );
};

