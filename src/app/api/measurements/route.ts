// Import necessary modules and schema

import PrismaServices from "../Prisma-Services";
import { z } from 'zod';
import { measurementSchema } from '@/lib/joi/schema/schema';
import { NextRequest, NextResponse } from 'next/server';

const prisma = PrismaServices.instance;

// Unified API handler function


export async function POST(request: NextRequest) {


  const body = await request.json();
  const validation =   measurementSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
    const { userId, ...measurementData } = body;

    const userMeasurement = await prisma.userMeasurements.upsert({
      where: { userId: userId },
      update: {},
      create: { userId: userId },
    });

  return NextResponse.json(userMeasurement, { status: 201 });
}


