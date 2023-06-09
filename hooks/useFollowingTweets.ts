import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useFollowingTweets = (userId?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASEURL}/api/followingtweets/${userId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFollowingTweets;
