import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";

export async function POST(request: Request) {
  await connectToDB();
  const { name, username, email, password } = await request.json();
  if (!name || !username || !email || !password) {
    return NextResponse.json(
      { message: "missing required data" },
      {
        status: 400,
      }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return NextResponse.json(
      { message: "Email Already Registered" },
      {
        status: 400,
      }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error" },
      {
        status: 400,
      }
    );
  }
}
