"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import { useAuthStore } from "../auth/store/Auth-Store";
import { useRouter } from "next/navigation";

export default function TopMenu() {
  // const useLoadStore = useLoadingStore((state) => state);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const authStore = useAuthStore((state) => state);
  const menuItems = ["Home", "Products", "Orders", "Log Out"];

  return (
    <Navbar
      className="text-white bg-blue border-divider"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div className="w-10 h-10">{/* <Logo /> */}</div>
          <p className="font-bold text-inherit">Health Planner</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden lg:flex">
        <NavbarItem>
          <Link href="/" className="text-white">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/landing" className="text-white">
            Landing
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {!authStore.authUser ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/sign_in" className="text-white">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                className="text-blue"
                href="/sign_up"
                variant="faded"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                onClick={() => {
                  authStore.logout();
                  router.push("/");
                }}
                className="text-red-500"
                variant="faded"
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
