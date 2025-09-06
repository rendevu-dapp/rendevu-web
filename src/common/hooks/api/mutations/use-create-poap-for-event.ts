import { useMutation } from "@tanstack/react-query";

//configs
import { apiClient } from "@/common/configs";

//types
import { APISuccessResponse } from "@/common/types/api";
import { CreatePoapInput } from "@/common/types/models/poap";

//fetcher
const createPoapFetcher = (args: { input: CreatePoapInput }) => {
  return apiClient
    .post<APISuccessResponse<void>>("/poaps", args.input)
    .then((res) => res.data);
};

//hooks
export const useCreatePoapForEvent = () => {
  return useMutation({
    mutationKey: ["createPoapForEvent"],
    mutationFn: createPoapFetcher,
  });
};
