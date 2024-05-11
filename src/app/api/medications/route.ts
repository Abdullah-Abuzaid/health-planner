// Import necessary modules and utilities
import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
import { z } from "zod";
import { medicationSchema } from "@/lib/joi/schema/schema";

const prisma = PrismaServices.instance;

// Unified handler for all medication-related requests


export async function POST(request: NextRequest) {


  const body = await request.json();
  const validation =   medicationSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

    const newMedication = await prisma.medications.create({ data: body });

  return NextResponse.json(newMedication, { status: 201 });
}

