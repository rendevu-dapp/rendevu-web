import { useMutation } from "@tanstack/react-query";

//configs
import { apiClient } from "@/common/configs";

//types
import { APISuccessResponse } from "@/common/types/api";
import { RequestMintCodesInput } from "@/common/types/models/poap";

//fetcher
const requestMintCodesFetcher = (args: {
  poapId: string;
  input: RequestMintCodesInput;
}) => {
  return apiClient
    .post<
      APISuccessResponse<void>
    >(`/poaps/${args.poapId}/request-mint-links`, args.input)
    .then((res) => res.data);
};

//hooks
export const useRequestMintCodes = () => {
  return useMutation({
    mutationKey: ["requestMintCodes"],
    mutationFn: requestMintCodesFetcher,
  });
};
