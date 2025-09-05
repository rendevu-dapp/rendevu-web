// imports
import { useQuery } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
// configs
import { apiClient } from "@/common/configs";
// types
import { APISuccessResponse } from "@/common/types/api";
import { User } from "@/common/types/models/user";

// Fetcher for bulk user profiles
export const getUserProfilesBulkFetcher = async (walletAddresses: string[]) => {
  const res = await apiClient.post<APISuccessResponse<User[]>>("/users/bulk", {
    walletAddresses,
  });
  return res.data;
};

// Hook for bulk user profiles
export const useGetUserProfilesBulk = (walletAddresses: string[]) => {
  return useQuery<User[], ApiError>({
    queryKey: ["getUserProfilesBulk", walletAddresses],
    queryFn: () => getUserProfilesBulkFetcher(walletAddresses),
    enabled: walletAddresses.length > 0,
  });
};
