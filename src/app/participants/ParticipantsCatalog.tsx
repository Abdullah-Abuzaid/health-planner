"use client";
import UsersCatalog from "../components/usersSearch/UsersCatalog";

import { useParticipantsStore } from "@/store/useParticipantsStore";
import { Link } from "@nextui-org/react";
import { User } from "./types";
import ParticipantCard from "./ParticipantCard";

const ParticipantsCatalog = () => {
  const usersData: User[] = [
    {
      name: "Ahmad Ali Hussain",
      age: 28,
      email: "michelle.rivera@example.com",
      image: "/assets/images/participant.png",
      phone: "(239) 555-0108",
      gender: "Male",
    },
    {
      name: "John Doe",
      age: 35,
      email: "john.doe@example.com",
      image: "/assets/images/participant.png",
      phone: "(123) 456-7890",
      gender: "Male",
    },
    {
      name: "Jane Smith",
      age: 30,
      email: "jane.smith@example.com",
      image: "/assets/images/participant.png",
      phone: "(987) 654-3210",
      gender: "Female",
    },
    {
      name: "Michael Johnson",
      age: 42,
      email: "michael.johnson@example.com",
      image: "/assets/images/participant.png",
      phone: "(555) 123-4567",
      gender: "Male",
    },
    {
      name: "Emily Davis",
      age: 25,
      email: "emily.davis@example.com",
      image: "/assets/images/participant.png",
      phone: "(111) 222-3333",
      gender: "Female",
    },
    {
      name: "David Wilson",
      age: 38,
      email: "david.wilson@example.com",
      image: "/assets/images/participant.png",
      phone: "(444) 555-6666",
      gender: "Male",
    },
    {
      name: "Sarah Thompson",
      age: 31,
      email: "sarah.thompson@example.com",
      image: "/assets/images/participant.png",
      phone: "(777) 888-9999",
      gender: "Female",
    },
    {
      name: "Christopher Martinez",
      age: 29,
      email: "christopher.martinez@example.com",
      image: "/assets/images/participant.png",
      phone: "(222) 333-4444",
      gender: "Male",
    },
    {
      name: "Jessica Anderson",
      age: 27,
      email: "jessica.anderson@example.com",
      image: "/assets/images/participant.png",
      phone: "(666) 777-8888",
      gender: "Female",
    },
    {
      name: "Daniel Clark",
      age: 33,
      email: "daniel.clark@example.com",
      image: "/assets/images/participant.png",
      phone: "(999) 000-1111",
      gender: "Male",
    },
    {
      name: "Olivia Rodriguez",
      age: 24,
      email: "olivia.rodriguez@example.com",
      image: "/assets/images/participant.png",
      phone: "(444) 555-6666",
      gender: "Female",
    },
    {
      name: "Matthew Lee",
      age: 36,
      email: "matthew.lee@example.com",
      image: "/assets/images/participant.png",
      phone: "(777) 888-9999",
      gender: "Male",
    },
  ];
  const { searchQuery, filteration } = useParticipantsStore((state) => state);
  const filteredUsers = usersData.filter((user) => {
    let isValid = false;
    isValid =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase());

    filteration.forEach((filter) => {
      if (
        filter.attribute === "gender" &&
        filter.value !== "select" &&
        filter.value !== ""
      ) {
        isValid =
          isValid &&
          user.gender.toLocaleLowerCase() === filter.value?.toLocaleLowerCase();
      }
    });
    return isValid;
  });

  return (
    <UsersCatalog>
      {filteredUsers
        ?.sort((a, b) => {
          if (filteration.length === 0) return 0;
          let result = 0;
          filteration.forEach((filter) => {
            if (filter.attribute === "age") {
              if (filter.value === "asc") {
                result = a.age - b.age;
              } else if (filter.value === "des") {
                result = b.age - a.age;
              }
            }
          });
          return result;
        })
        .map((user, index) => (
          <Link key={index} href={"/client"}>
            <ParticipantCard
              participant={user}
              key={user.email + "_" + user.phone}
            />
          </Link>
        ))}
    </UsersCatalog>
  );
};

export default ParticipantsCatalog;
