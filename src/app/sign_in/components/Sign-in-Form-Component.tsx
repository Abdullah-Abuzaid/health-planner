"use client";
import AuthenticationServices from "@/core/auth/services/Auth-Services";
import { useAuthStore } from "@/core/auth/store/Auth-Store";
import { useModalStore } from "@/core/modal/store/Modal-Store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";
import { set, z } from "zod";

export default function SignInForm() {
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
  });

  type FormFields = z.infer<typeof formSchema>;
  const {
    register,
    control, setError,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormFields>({ resolver: zodResolver(formSchema) });
  const authStore = useAuthStore((state) => state);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="flex flex-col gap-3">
      <h1 className=" text-lg font-bold">Login</h1>
      <Form
        onSubmit={async (submit) => {
          const loginData = await authStore.login({
            email: getValues("email"),
            password: getValues("password"),
          });
          if (loginData.succeeded) {
            router.push("/participants");
          }
          else {
            setError("root", {
              message: loginData.message!,
            })
          }
        }}
        className="flex flex-col gap-3"
        control={control}
      >
        <Input
          {...register("email")}
          isInvalid={errors.email !== undefined}
          errorMessage={errors.password?.message}
          name="email"
          label="Email"
        />
        <div className="flex flex-col gap-1 justify-start">
          <a
            onClick={() => {
              openModal("resetPassword");
            }}
            className="text-blue-600"
          >
            Forget Password?
          </a>
          <Input
            type="password"
            isInvalid={errors.password !== undefined}
            errorMessage={errors.password?.message}
            {...register("password")}
            label="Password"
          />
        </div>
        <div className="text-red-500">{errors.root?.message}</div>
        <Button isLoading={isSubmitting} color="primary" type="submit">
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
