"use client";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiCancel } from "react-icons/gi";
import { useWindowSize } from "@uidotdev/usehooks";

const NavBar = ({ children }: { children: ReactNode }) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const size = useWindowSize();
  useEffect(() => {
    if (!isToggle && size?.width && size.width > 600) setIsToggle(true);
  }, [size]);

  return (
    <nav className="fixed rounded-lg z-50 w-full flex flex-col justify-between bg-gradient-to-tr from-gray-900 to-gray-600 p-4 text-xl font-bold text-base-100 sm:flex-row sm:text-2xl lg:w-[80%] xl:w-[65%] 2xl:w-[60%]">
      <div className="flex items-center justify-between">
        <Image
          src="/logo.png"
          className="rounded-full"
          width={50}
          height={50}
          alt="Logo"
        />
        <div
          className="sm:hidden"
          onClick={() => {
            setIsToggle((prev: boolean) => !prev);
          }}
        >
          {isToggle ? (
            <GiCancel className="animate-spin-click" size={36} />
          ) : (
            <GiHamburgerMenu className="animate-spin-click" size={36} />
          )}
        </div>
      </div>
      <div
        className={`${isToggle ? "" : "hidden"} divider divider-secondary sm:hidden`}
      ></div>
      <ul
        className={`${isToggle ? "duration-800 h-full opacity-100 delay-200 ease-in" : "duration-800 invisible h-0 opacity-0 delay-200 ease-in-out"} divide-y  divide-solid transition-all sm:flex sm:items-center sm:justify-center sm:gap-4 sm:divide-none`}
      >
        {children}
      </ul>
    </nav>
  );
};

export default NavBar;
