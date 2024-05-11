import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import PrismaServices from "../Prisma-Services";
const prisma = PrismaServices.instance;
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const userLogin = await prisma.authUser.findUnique({
      where: {
        email: email,
      },
    });
    if (!userLogin) {
      return new NextResponse(
        JSON.stringify({ message: "Email Doesn't Exist" }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }

    const isCorrectPassword = compareSync(password, userLogin.password);
    if (!isCorrectPassword) {
      return new NextResponse(
        JSON.stringify({ message: "Incorrect Password" }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }
    return new NextResponse(JSON.stringify(userLogin), {
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
