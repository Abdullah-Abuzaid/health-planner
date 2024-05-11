"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNavbar from "@/core/navbar/TopNavbar-Component";
import SideMenu from "@/core/navbar/side_menu/side_menu_component";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import ResetPasswordModal from "@/core/modal/Reset-Password-Modal";
import { useModalStore } from "@/core/modal/store/Modal-Store";
import { use, useEffect } from "react";
import { useDisclosure } from "@nextui-org/modal";
import Sidebar from "./components/usersSearch/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const route = usePathname();
  const modalStore = useModalStore();

  return (
    <html lang="en">
      <body className="w-svw flex flex-col bg-background">
        {...modalStore.getAllModals().map((modal) => modal())}
        <header>
          <TopNavbar></TopNavbar>
          <div className="flex flex-row">
            {!route.includes("sign") && route !== "/" ? (
              <SideMenu></SideMenu>
            ) : // <div className="h-screen ">
            //   <Sidebar />
            // </div>
            null}
            <main className=" w-full">{children}</main>
          </div>
        </header>
      </body>
    </html>
  );
}
