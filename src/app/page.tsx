"use client";

import LandingPage from "./landing/page";
import { useAuthStore } from "@/core/auth/store/Auth-Store";
import ParticipantsPage from "./participants/page";
import { useRouter } from "next/navigation";
export default function Page() {
  const authUser = useAuthStore((state) => state.authUser);
  const router = useRouter();
  authUser ? router.push("/participants") : null;
  return (
    <div className="bg-background">
      <LandingPage />
    </div>
  );
}
