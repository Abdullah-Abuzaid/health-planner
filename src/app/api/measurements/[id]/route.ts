import { measurementSchema } from '@/lib/joi/schema/schema';
import PrismaServices from "../../Prisma-Services";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = PrismaServices.instance;


export async function GET(req: NextRequest) {
  const id = req.url?.split('/').slice(-1).pop();

  try {
    const measurement = await prisma.userMeasurements.findUnique({
      where: {
        Id: id as string,
      },
      include: {
        measurements: {}
      }
    });

    if (!measurement) {
      return NextResponse.json({ error: 'Measurement not found' }, { status: 404 });
    }

    return NextResponse.json(measurement);
  } catch (error) {
    console.error('Error fetching measurement:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    let id = req.url?.split("/").slice(-1).pop()
    let body = await req.json();

    // Validate request body against measurementSchema
    measurementSchema.parse(body);

    // Extract necessary fields from the request body
    const { name, measurementType, measurementValue, measurementUnit, measuredOn } = body;

    // first check if the measurement exists
    const measurement = await prisma.measurements.findUnique({
      where: {
        Id: id as string,
      },
    });

    if (!measurement) {
      return NextResponse.json({ error: 'Measurement not found' }, { status: 404 });
    }
    // Update the measurement in the database
    const updatedMeasurement = await prisma.measurements.update({
      where: {
        Id: id as string,
      },
      data: {
        name,
        measurementType,
        measurementValue,
        measurementUnit,
        measuredOn: new Date(measuredOn),
      },
    });

    return NextResponse.json(updatedMeasurement);
  } catch (error) {
    console.error('Error updating measurement:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors.map((error) => error.path.join('.') + ': ' + error.message),
      }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  let id = req.url?.split("/").slice(-1).pop()

    try {
      await prisma.measurements.delete({
        where: {
          Id: id as string,
        },
      });

        return NextResponse.json({ message: 'Measurement deleted successfully' });
    } catch (error) {
        console.error('Error deleting measurement:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
   
  }