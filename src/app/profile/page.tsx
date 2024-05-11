
'use client'
import { useAuthStore } from "@/core/auth/store/Auth-Store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, AutocompleteItem, Button, CalendarDate, DatePicker, Dropdown, DropdownItem, DropdownMenu, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { parseDate, getLocalTimeZone, fromDate } from "@internationalized/date";

import { set, z } from "zod";
import { Gender } from "@prisma/client";

export default function ProfilePage() {
  const authStore = useAuthStore((state) => state);
  const schema = z.object({
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),

    phone: z.string().regex(/^\d{10}$/),
    dob: z.string().date(),
    bio: z.string().max(500),

    gender: z.custom<Gender>(),

  })

  type FormFields = z.infer<typeof schema>
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema), values: authStore.getProfileData()
  });

  return !authStore.authUser ? <><div>yuo must log in</div></> : (
    <div className=" flex w-full h-[100vh] justify-center align-middle">

      <div className="self-center flex flex-col gap-3">
        <h1 className="self-center ">Profile Page</h1>
        <form className="min-w-[400px] self-center gap-3 flex flex-col" onSubmit={handleSubmit(async (data) => {

          await authStore.saveProfileData(
            {
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              dob: data.dob,
              bio: data.bio,
              gender: data.gender,
              Id: authStore.authUser!.Id!,
            }
          )
        })}>
          <div className="flex flex-row gap-2">
            <Input label="First Name" {...register("firstName")} isInvalid={errors.firstName !== undefined} errorMessage={errors.firstName?.message}></Input>
            <Input label="Last Name" {...register("lastName")} isInvalid={errors.lastName !== undefined} errorMessage={errors.lastName?.message}></Input>


          </div>
          <Input label="Phone" {...register("phone")} isInvalid={errors.phone !== undefined} errorMessage={errors.phone?.message}></Input>
          <Input label="Bio" {...register("bio")} isInvalid={errors.bio !== undefined} errorMessage={errors.bio?.message}></Input>
          <Input type="date" label={"Date of Birth"} {...register("dob")}
            isInvalid={errors.dob !== undefined} errorMessage={errors.dob?.message}
          >

          </Input>
          <div className="text-gray-400">current dob: {authStore.userData?.dateOfBirth?.toString()}</div>
          <div className="text-red-500">{errors.dob?.message}</div>

          <Autocomplete
            label="Gender"
            defaultSelectedKey={getValues("gender") || undefined}
            onSelectionChange={
              (g) => {
                setValue('gender', g as Gender)
              }
            }>
            <AutocompleteItem key={"MALE"} value={"MALE"}>
              MALE
            </AutocompleteItem>
            <AutocompleteItem key={"FEMALE"} value={"FEMALE"}>
              FEMALE
            </AutocompleteItem>
          </Autocomplete>
          <div className="text-red-500">{errors.gender?.message}</div>
          <div>{errors.root?.message}</div>
          <Button isLoading={isSubmitting} type="submit">Save</Button>
        </form>
      </div>

    </div >
  );
}