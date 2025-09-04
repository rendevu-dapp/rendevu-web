// imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

// configs
import { apiClient } from "@/common/configs";

// types
import { APISuccessResponse } from "@/common/types/api";
import { CreateUserInput, User } from "@/common/types/models/user";

// fetcher
const setupUserProfileFetcher = (args: { input: CreateUserInput }) => {
  return apiClient
    .post<APISuccessResponse<User>>("/users", args.input)
    .then((res) => res.data);
};

// hooks
export const useSetupUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["setupUserProfile"],
    mutationFn: setupUserProfileFetcher,
    onSuccess(_data, variables) {
      // invalidate the user profile query to refetch the updated data
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile", variables.input.walletAddress],
      });
    },
  });
};
