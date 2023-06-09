import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { connectToDB } from "@/utils/database";

export async function GET(request: Request) {
  try {
    await connectToDB();
    const userId = request.url.slice(request.url.lastIndexOf("/") + 1);
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!currentUser) {
      throw new Error("Invalid ID");
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: { in: currentUser?.followingIds },
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
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
