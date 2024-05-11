'use client'
import React from "react";
import Avatar from "../../core/navbar/side_menu/Avatar";
import { FaTelegramPlane } from "react-icons/fa";
import { User } from "@/app/features/types";

interface ParticipantCardProps {
  participant: User;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant }) => {
  return (
    <div className="bg-white rounded-lg p-5 max-h-[250px] w-full">
      <div className="flex items-center">
        <Avatar path={participant.image} size={70} alt={participant.name} />
        <div className="ml-3">
          <h1 className="text-lg">{participant.name}</h1>
          <p className="text-[#000000] text-sm opacity-50">
            {participant.gender + " " + participant.age}
          </p>
        </div>
      </div>
      <div className="my-4 text-lg gap-1">
        {/** Phone Number */}
        <p className="text-[#000000] opacity-60">{participant.phone}</p>
        {/** Email */}
        <p className="text-[#000000] opacity-60"> {participant.email} </p>
      </div>
      <div className="flex justify-between mt-2">
        <button className="bg-[#F3F9FD] px-5 py-3 rounded-full w-full flex items-center justify-center">
          <p className="text-[#0056B3]">Chat With Patient</p>
          <FaTelegramPlane
            className="inline-block ml-5 text-[#0056B3]"
            color="#0056B3"
            size={18}
          />
        </button>
      </div>
    </div>
  );
};

export default ParticipantCard;
