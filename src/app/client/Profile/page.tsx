"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../Profile/componentsProfile/layout";
import StatCard from "../Profile/componentsProfile/StatCard";
import Timeline from "../Profile/componentsProfile/Timeline";
import MedicalHistory from "../Profile/componentsProfile/MedicalHistory";
import ContactInfo from "../Profile/componentsProfile/ContactInfo";
import CalendarComponent from "./componentsProfile/CalendarComponent";
import styles from "./Profile.module.css"; // Assume this is where you keep your CSS
import { TempUser } from "./tempUser"; // adjust the import path as needed
import prisma from "@/app/prismaGenerate";

import MedicationTable, {
  StatusKey,
} from "../Profile/componentsProfile/MedicationTable"; // Adjust the import path as needed
import { promise } from "zod";

async function getUser(_id: string) {
  // return await prisma.user.findUnique({
  //   where: { Id: _id }
  // });
  return await prisma.user.findFirst();
}
async function getUserMedication(_id: string) {
  return await prisma.userMedications.findUnique({
    where: { userId: _id },
  });
}
async function getMedicalHistory(_id: string) {
  return await prisma.medicalHistory.findUnique({
    where: { userId: _id },
  });
}
async function getMedications(_id: string) {
  return await prisma.medications.findMany({
    where: { userMedications: { some: { userId: _id } } },
  });
}
async function getdisease(_id: string) {
  return await prisma.disease.findMany({
    where: { histories: { some: { userId: _id } } },
  });
}
function AgeCalc(dateOfBirth: Date) {
  return 10;
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<TempUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser("111"); // Use the actual user ID needed
      //const userMedication = await getUserMedication("111");
      let id = user?.userId ?? "";
      const userMedication = await getMedications(id);
      const userMedicalHistory = await getdisease(id);
      const now = new Date();
      if (user && userMedication && userMedicalHistory) {
        // Decompose user data into separate variables
        const contactInfo = {
          name: `${user.fullName} ${user.lastname ?? ""}`,
          age: AgeCalc(user.dateOfBirth ?? new Date(Date.now())), // Convert to age if necessary
          gender: user.gender?.toString() ?? " ",
          address: "user.address",
          job: user.roles.toString(),
          phone: user.phone ?? "",
          email: user.email,
          diagnosis: "user.diagnosis" ?? "N/A",
          healthBarriers: ["user.healthBarriers"],
        };

        const statCards = [
          { title: "Patients", value: "92", icon: "👥" },
          { title: "Weight", value: "92 kg", icon: "⚖️" },
          { title: "Height", value: "182 cm", icon: "📏" },
          { title: "Blood Type", value: "O+", icon: "💉" },
        ];

        const timelineEvents = userMedicalHistory.map((mh) => ({
          date: "mh.createdAt.toISOString()", // Assuming createdAt for event timing
          event: "mh.description",
        }));
        const medications = userMedication.map((med) => ({
          name: med.medicationName,
          status: med.status.toString(),
          dosage: med.dosage,
          frequency: med.frequency,
          prescribingPhysician: med.prescribingPhysician,
          startDate: med.startDate, // Assuming startDate is not nullable
          endDate: med.endDate ?? now, // Handle nullable endDate
        })); // Provide a default empty array if userMedications is null

        const medicalHistory = userMedicalHistory.map((mh) => ({
          condition: mh.diseaseName,
          details: "mh.description" ?? "No details provided", // Handle nullable description
        })); // Provide a default empty array if medicalHistory is null
        // Combine all variables into TempUser structure
        setUserData({
          contactInfoData: contactInfo,
          statCardsData: statCards,
          timelineData: timelineEvents,
          medicationsData: medications,
          medicalHistoryEntries: medicalHistory,
        });
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      <div className={styles.gridContainer}>
        {/* Stat Cards */}
        <div className={styles.statCardsContainer}>
          {userData.statCardsData.map((card, index) => (
            <div key={index} className={styles.statCard}>
              <StatCard {...card} />
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className={styles.timelineContainer}>
          <Timeline entries={userData.timelineData} />
        </div>

        {/* Calendar */}
        <div className={styles.calendarContainer}>
          <CalendarComponent />
        </div>

        {/* Medical History */}
        <div className={styles.medicalHistoryContainer}>
          <MedicalHistory entries={userData.medicalHistoryEntries} />
        </div>

        {/* Contact Info */}
        <div className={styles.contactInfoContainer}>
          <ContactInfo {...userData.contactInfoData} />
        </div>

        {/* Medication Table */}
        <div className={styles.medicationTableContainer}>
          <MedicationTable medications={userData.medicationsData} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
