"use client";
import AuthenticationServices from "@/core/auth/services/Auth-Services";
import { useAuthStore } from "@/core/auth/store/Auth-Store";
import { useModalStore } from "@/core/modal/store/Modal-Store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input } from "@nextui-org/react";
import Link from "next/link";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

export default function SignInForm() {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
  });

  const formData = useForm({ resolver: zodResolver(formSchema) });
  const authStore = useAuthStore((state) => state);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="flex flex-col gap-3">
      <h1 className=" text-lg font-bold">Login</h1>
      <Form
        onSubmit={async (submit) => {
          const res = await AuthenticationServices.login({
            email: formData.getValues("email"),
            password: formData.getValues("password"),
          });

          if (res.succeeded) {
            authStore.setAuthUser(res.data);
          } else {
            formData.setError("email", {
              type: "manual",
              message: res.message!,
            });
          }
        }}
        className="flex flex-col gap-3"
        control={formData.control}
      >
        <Input
          {...formData.register("email")}
          isInvalid={formData.getFieldState("email").error !== undefined}
          errorMessage={formData.getFieldState("email").error?.message}
          label="Email"
        />

        <Input
          isInvalid={formData.getFieldState("password").error !== undefined}
          errorMessage={formData.getFieldState("password").error?.message}
          {...formData.register("password")}
          label="Password"
        />
        <Button color="primary" type="submit">
          Login
        </Button>
      </Form>

      <Divider></Divider>
      <Link className="min-w-full" href={"sign_up"}>
        <Button className="w-full" color="primary" variant="bordered">
          Create Account
        </Button>
      </Link>
    </div>
  );
}
