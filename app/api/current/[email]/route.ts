import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  try {
    const email = request.url.slice(request.url.lastIndexOf("/") + 1);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return NextResponse.json(user, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':"*",
        "Content-Type": "application/json",
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "user route wrong" },
      {
        status: 400,
      }
    );
  }
}
