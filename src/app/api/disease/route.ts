// Import necessary libraries
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaServices from "../Prisma-Services";
import { z } from 'zod';
import { diseaseSchema } from '@/lib/joi/schema/schema'; // Assuming Joi is used correctly
import { NextRequest, NextResponse } from 'next/server';

// Initialize Prisma service instance
const prisma = PrismaServices.instance;


export async function POST(request: NextRequest) {


    const body = await request.json();
    const validation =   diseaseSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
  
      const { diseaseName, medicalHistoryId } = body;
      const newDisease = await prisma.disease.create({
          data: {
              diseaseName: diseaseName,
          },
      });

      if (medicalHistoryId) {
          const history = await prisma.medicalHistoryDisease.create({
              data: {
                  medicalHistoryId,
                  diseaseId: newDisease.Id,
              },
          });
  
 
  }
  return NextResponse.json(newDisease, { status: 201 });

}
