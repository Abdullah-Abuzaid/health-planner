"use client";
import AuthenticationServices from "@/core/auth/services/Auth-Services";
import { useAuthStore } from "@/core/auth/store/Auth-Store";
import DividerText from "@/core/divider/Divider-Text-Component";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input } from "@nextui-org/react";

import Link from "next/link";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { z } from "zod";

export default function SignUpForm() {
  const authStore = useAuthStore((state) => state);

  const passwordSchema = z.string().min(8).max(100);
  const emailSchema = z.string().email();
  const fullNameSchema = z.string().min(3).max(100);
  const schema = z.object({
    email: emailSchema,
    password: passwordSchema,
    fullName: fullNameSchema,
  });
  const [isVisible, setIsVisible] = useState(false);
  const formData = useForm({ resolver: zodResolver(schema) });
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const registerInput = (name: string) => {
    return {
      ...formData.register(name),
      isInvalid: formData.getFieldState(name).error !== undefined,
      errorMessage: formData.getFieldState(name).error?.message,
    };
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-bold">Create Account</h1>
      <Form
        onSubmit={async () => {
          const res = await AuthenticationServices.register({
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
        className="gap-3 flex flex-col"
        control={formData.control}
      >
        <Input {...registerInput("fullName")} label="Full Name" />

        <Input {...registerInput("email")} label="Email" />
        <Input
          {...registerInput("password")}
          label="Password"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <Button type="submit" color="primary">
          Sign Up
        </Button>
      </Form>

      <DividerText
        content={
          <Link href="sign_in" className="text-blue-600">
            Already Have An Account?
          </Link>
        }
      ></DividerText>
      <Link className="min-w-full" href={"sign_in"}>
        <Button className="w-full" color="primary" variant="bordered">
          Login In
        </Button>
      </Link>
    </div>
  );
}
