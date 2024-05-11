import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
import { ProfileInterface } from "@/core/auth/services/Auth-Services";
const prisma = PrismaServices.instance;
export async function POST(req: NextRequest) {
  const data: ProfileInterface = await req.json();

  try {
    const result = await prisma.user.update({
      where: {
        userId: data.Id,
      },
      data: {
        fullName: data.firstName + " " + data.lastName,
        lastname: data.lastName,
        gender: data.gender,
        phone: data.phone,
        dateOfBirth: new Date(data.dob),
        bio: data.bio,
      },
    });

    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error, payload: data }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
