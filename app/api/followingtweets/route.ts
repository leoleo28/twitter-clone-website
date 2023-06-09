import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { connectToDB } from "@/utils/database";

export async function GET(request: Request) {
  try {
    await connectToDB();

    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts, {
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
      { message: "Something wrong" },
      {
        status: 400,
      }
    );
  }
}
