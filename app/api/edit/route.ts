import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PATCH(request: Request) {
  try {
    const { name, username, bio, profileImage, coverImage, email } =
      await request.json();
    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updatedUser, {
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
