// imports

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Address } from "thirdweb";

// configs
import { apiClient } from "@/common/configs";

// types
import { APISuccessResponse } from "@/common/types/api";
import { UpdateUserInput, User } from "@/common/types/models/user";

// fetcher
const updateUserProfileFetcher = (args: {
  walletAddress: Address;
  input: UpdateUserInput;
}) => {
  return apiClient
    .patch<APISuccessResponse<User>>(`/users/${args.walletAddress}`, args.input)
    .then((res) => res.data);
};

// hooks
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateUserProfile"],
    mutationFn: updateUserProfileFetcher,
    onSuccess(_data, variables) {
      // invalidate the user profile query to refetch the updated data
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile", variables.walletAddress],
      });
    },
  });
};
