// Import necessary modules
import {  medicationSchema } from '@/lib/joi/schema/schema';
import PrismaServices from "../../Prisma-Services";
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

let prisma = PrismaServices.instance;
// Import necessary modules
export async function GET(req: NextRequest) {
  // Extract the medication ID from the URL
  const id = req.url?.split('/').slice(-1).pop();

  try {
    // Fetch the medication with the specified ID from the database
    const medication = await prisma.medications.findUnique({
      where: {
        Id: id
      }
    });

    // Send success response with the fetched medication
    return NextResponse.json(medication);
  } catch (error) {
    // Handle database errors
    console.error('Error fetching medication:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Extract the medication ID from the URL
    const id = req.url?.split('/').slice(-1).pop();

    // Parse request body against zod schema
    const body = await req.json();
    medicationSchema.parse(body);

    // Update the medication with the specified ID in the database
    const updated = await prisma.medications.update({
      where: { Id: id as string },
      data: {
        ...body
      }
    });

    // Send success response with the updated medication
    return NextResponse.json(updated);
  } catch (error) {
    // Handle validation errors and database errors
    console.error('Error updating medication:', error);
    if (error instanceof z.ZodError) {
      // Send validation error response
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors.map((error) => error.path.join('.') + ': ' + error.message),
      }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Extract the medication ID from the URL
    const id = req.url?.split('/').slice(-1).pop();

    // Delete the medication with the specified ID from the database
    await prisma.medications.delete({
      where: { Id: id as string }
    });

    // Send success response
    return NextResponse.json({ message: 'medication deleted' });
  } catch (error) {
    // Handle database errors
    console.error('Error deleting medication:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
