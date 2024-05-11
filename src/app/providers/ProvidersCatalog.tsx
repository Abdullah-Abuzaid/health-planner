"use client";

import React from "react";
import UsersCatalog from "../components/usersSearch/UsersCatalog";

import { useParticipantsStore } from "@/store/useParticipantsStore";
import { Link } from "@nextui-org/react";
import { User } from "@prisma/client";
import ProviderCard from "./ProviderCard";

const ProvidersCatalog = () => {
  const usersData: User[] = [];
  const { searchQuery, filteration } = useParticipantsStore((state) => state);
  // const filteredUsers = usersData.filter((user) => {
  //   let isValid = false;
  //   isValid =
  //     user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.lastname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.phone.toLowerCase().includes(searchQuery.toLowerCase());

  //   filteration.forEach((filter) => {
  //     if (
  //       filter.attribute === "gender" &&
  //       filter.value !== "select" &&
  //       filter.value !== ""
  //     ) {
  //       isValid =
  //         isValid &&
  //         user.gender.toLocaleLowerCase() === filter.value?.toLocaleLowerCase();
  //     }
  //   });
  //   return isValid;
  // });

  return (
    <UsersCatalog>
      {/* {filteredUsers
        ?.sort((a, b) => {
          if (filteration.length === 0) return 0;
          let result = 0;
          filteration.forEach((filter) => {
            if (filter.attribute === "age") {
              if (filter.value === "asc") {
                result = a.dateOfBirth.getTime() - b.dateOfBirth.getTime();
              } else if (filter.value === "des") {
                result = b.dateOfBirth.getTime() - a.dateOfBirth.getTime();
              }
            }
          });
          return result;
        })
        .map((user, index) => (
          <Link key={index} href={"/client"}>
            <ProviderCard
              provider={{
                name: "Feras Alhazmi",
                specialty: "personal trainer",
                hospital: "fitness Time",
                image: "/assets/images/participant.png",
                rating: 4.8,
                reviewsCount: 128,
                consultationTime: "10PM",
              }}
            />
          </Link>
        ))} */}

      {Array.from({ length: 10 }, (_, index) => (
        <Link key={index} href={"/providers/ProviderProfile"}>
          <ProviderCard
            provider={{
              name: "Feras Alhazmi",
              specialty: "personal trainer",
              hospital: "fitness Time",
              image: "/assets/images/participant.png",
              rating: 4.8,
              reviewsCount: 128,
              consultationTime: "10PM",
            }}
          />
        </Link>
      ))}
    </UsersCatalog>
  );
};

export default ProvidersCatalog;
