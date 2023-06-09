import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useCurrentUser = (userEmail: string | undefined | null) => {
  const { data, error, isLoading, mutate } = useSWR(
    userEmail
      ? `${process.env.NEXT_PUBLIC_BASEURL}/api/current/${userEmail}`
      : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
