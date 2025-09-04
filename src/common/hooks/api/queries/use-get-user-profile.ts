// imports
import { useQuery } from "@tanstack/react-query";

// configs
import { apiClient } from "@/common/configs";

// types
import { APISuccessResponse, ApiError } from "@/common/types/api";
import { User } from "@/common/types/models/user";

// fetcher
export const getUserProfileFetcher = async (walletAddress: string) => {
  const res = await apiClient.get<APISuccessResponse<User>>(
    `/users/${walletAddress}`,
  );
  return res.data;
};

// hooks
export const useGetUserProfile = (walletAddress?: string) => {
  return useQuery<User | undefined, ApiError>({
    queryKey: ["getUserProfile", walletAddress],
    queryFn: () =>
      walletAddress
        ? getUserProfileFetcher(walletAddress)
        : Promise.resolve(undefined),
    retry: (failureCount, error) => {
      // Don't retry if the error is a 404
      if (error.status === 404) {
        return false;
      }
      // Otherwise, retry up to 3 times (default behavior)
      return failureCount < 3;
    },
    enabled: !!walletAddress,
  });
};
