"use client";
import AuthenticationServices from "@/core/auth/services/Auth-Services";
import { useAuthStore } from "@/core/auth/store/Auth-Store";
import DividerText from "@/core/divider/Divider-Text-Component";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input } from "@nextui-org/react";
import { AuthUser } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { z } from "zod";

export default function SignUpForm() {
  const router = useRouter();
  const authStore = useAuthStore((state) => state);

  const passwordSchema = z.string().min(8).max(100);
  const emailSchema = z.string().email();
  const schema = z.object({
    email: emailSchema,
    password: passwordSchema,

  });
  type FormFields = z.infer<typeof schema>;
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,

    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-bold">Create Account</h1>
      <form
        onSubmit={handleSubmit(async (data) => {

          const registerData = await authStore.registerAuthUser({
            password: data.password,
            email: data.email,
          });

          if (registerData.succeeded) {
            router.push("/sign_in");
          } else {
            setError("root", {
              message: registerData.message!,
            });
          }
        })}
        className="gap-3 flex flex-col"

      >
        <Input
          {...register("email")}
          isInvalid={errors.email !== undefined}
          errorMessage={<p> {errors.email?.message}</p>}
          label="Email"
        />
        <Input
          {...register("password")}
          isInvalid={errors.password !== undefined}
          errorMessage={<p> {errors.password?.message}</p>}
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
        <div className="text-red-500">{errors.root?.message}</div>
        <Button type="submit" color="primary">
          Sign Up
        </Button>
      </form>

      <DividerText
        content={
          <Link href="sign_in" className="text-blue-600">
            Already Have An Account?
          </Link>
        }
      ></DividerText>
      <Link className="min-w-full" href={"sign_in"}>
        <Button isLoading={isSubmitting} className="w-full" color="primary" variant="bordered">
          Login In
        </Button>
      </Link>
    </div>
  );
}
