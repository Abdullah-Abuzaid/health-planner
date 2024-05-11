import { NextRequest, NextResponse } from "next/server";

import PrismaServices from "../Prisma-Services";
const prisma = PrismaServices.instance;
export async function POST(req: NextRequest) {
  const { Id } = await req.json();
 
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId:Id
      },
    });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User Doesn't Exist" }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }

   
   
    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
