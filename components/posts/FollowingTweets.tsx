"use client";

import PostItem from "./PostItem";
import { useSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFollowingTweets from "@/hooks/useFollowingTweets";
import { ClipLoader } from "react-spinners";

interface PostFeedProps {}

const PostFeed: React.FC<PostFeedProps> = () => {
  const { data: session } = useSession();
  const { data: currentUser, isLoading: processing } = useCurrentUser(
    session?.user?.email
  );
  const { data: posts = [], isLoading } = useFollowingTweets(currentUser?.id);

  if (isLoading || processing)
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={currentUser.id} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
