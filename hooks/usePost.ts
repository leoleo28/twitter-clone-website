import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    postId ? `${process.env.NEXT_PUBLIC_BASEURL}/api/posts/${postId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
