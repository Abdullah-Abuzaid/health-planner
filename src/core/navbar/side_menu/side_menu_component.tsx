"use client";
import { usePathname, useRouter } from "next/navigation";

import SideMenuButton from "./side_menu_button";

import { CiBoxes, CiReceipt } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { FaTelegramPlane } from "react-icons/fa";
import Avatar from "./Avatar";
import { useAuthStore } from "@/core/auth/store/Auth-Store";
import { AiFillProfile } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

export default function SideMenu() {
  const router = useRouter();
  const authStore = useAuthStore((state) => state);
  return (
    <nav className="h-svh  max-sm:hidden bg-blue  border-r-1 border-divider flex-col flex text-center text-base text-pretty p-2 transition-all">
      <div className="mt-16  flex justify-center items-center px-4">
        <Avatar path="/assets/images/user.png" onClick={() =>
          router.push("/profile")
        } size={50} />
        <p className="text-lg font-semibold text-white hidden xl:block xl:ml-5 ">
          {authStore.userData?.fullName ?? "Guest"}
        </p>
      </div>
      <div className="mt-32 flex flex-col justify-center">
        <SideMenuButton
          icon={
            <RxAvatar
              className="inline-block mr-5 font-extrabold max-sm:size-4 size-7"
            // size={30}
            />
          }
          text="Profile"
          linkPath="/profile"
        ></SideMenuButton>
        <SideMenuButton
          icon={
            <HiUserGroup
              className="inline-block mr-5 font-extrabold max-sm:size-4 size-7"
            // size={30}
            />
          }
          text="Participants"
          linkPath="/participants"
        ></SideMenuButton>
        <SideMenuButton
          icon={
            <HiUserGroup
              className="inline-block mr-5 font-extrabold"
              size={30}
            />
          }
          text="Health Providers"
          linkPath="/providers"
        ></SideMenuButton>
        <SideMenuButton
          icon={
            <FaTelegramPlane
              className="inline-block mr-5 font-extrabold"
              size={30}
            />
          }
          text="Chat"
          linkPath="/chat"
        ></SideMenuButton>
      </div>

      {/* <SideMenuButton
        icon={<CiBoxes />}
        text="Landing"
        linkPath="/landing"
      ></SideMenuButton>
      <SideMenuButton
        icon={<CiReceipt />}
        text="Orders"
        linkPath="/orders"
      ></SideMenuButton>
      <SideMenuButton
        icon={<CiBoxes />}
        text="Features"
        linkPath="/features/participants"
      ></SideMenuButton> */}
    </nav>
  );
}
