"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Component, ReactElement } from "react";

interface SideMenuButtonProps {
  linkPath: string;
  text: string;
  icon: ReactElement;
}

export default function SideMenuButton({
  linkPath,
  text,
  icon,
}: SideMenuButtonProps) {
  const pathName = usePathname();
  var isActive = pathName.includes(linkPath)
  return (
    <div
      className={` flex-row justify-between flex items-center w-full px-10  py-3 ${isActive ? " border-r-white border-l-[4px]" : null
        }`}
      style={{
        background: ` ${isActive
          ? "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.027) 100%)"
          : ""
          }`,
      }}
    >
      <div className="size-10">
        <Link href={linkPath} className="text-white">
          {icon}
        </Link>
      </div>
      <Link className="text-white max-sm:hidden font-bold text-medium" href={linkPath}>
        {text}
      </Link>
      <div className="w-2 max-sm:hidden transition-all"></div>
    </div>
  );
}
