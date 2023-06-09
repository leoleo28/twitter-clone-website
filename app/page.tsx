"use client";

import Form from "@/components/Form";
import Header from "@/components/Header";
import FollowingTweets from "@/components/posts/FollowingTweets";
import PostFeed from "@/components/posts/PostFeed";
import { useSession } from "next-auth/react";
import { useState } from "react";

const TABS = ["Recent", "Following"] as const;

export default function Home() {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Recent");
  const { data: session } = useSession();

  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening" />
      {session?.user && (
        <div className="flex">
          {TABS.map((tab) => {
            return (
              <button
                key={tab}
                className={`flex-grow p-2 text-white ${
                  tab === selectedTab
                    ? "border-b-4 border-b-blue-500 font-bold"
                    : ""
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      )}
      {!session?.user ? (
        <PostFeed />
      ) : selectedTab === "Following" ? (
        <FollowingTweets />
      ) : (
        <PostFeed />
      )}
    </>
  );
}
