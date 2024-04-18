"use client";
import { useModalStore } from "@/core/modal/store/Modal-Store";
import { Button, Divider, Input } from "@nextui-org/react";
import Link from "next/link";

export default function SignInForm() {
  const openModal = useModalStore((state) => state.openModal);
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-bold">Login</h1>
      <Input label="Email" />
      <div className="flex flex-col gap-1 justify-start">
        <a
          onClick={() => {
            openModal("resetPassword");
          }}
          className="text-blue-600"
        >
          Forget Password?
        </a>
        <Input label="Password" />
      </div>
      <Button color="primary">Login</Button>
      <Divider></Divider>
      <Link className="min-w-full" href={"sign_up"}>
        <Button className="w-full" color="primary" variant="bordered">
          Create Account
        </Button>
      </Link>
    </div>
  );
}