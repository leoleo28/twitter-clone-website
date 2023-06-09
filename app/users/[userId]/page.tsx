"use client";

import { usePathname } from "next/navigation";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";
import Header from "@/components/Header";

import PostFeed from "@/components/posts/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import { useSession } from "next-auth/react";
const UserView = () => {
  const pathname = usePathname();
  const userId = pathname.slice(pathname.lastIndexOf("/") + 1);
  const { data: fetchedUser, isLoading } = useUser(userId as string);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} userEmail={userEmail as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
