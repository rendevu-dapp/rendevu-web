// imports
import { useMutation } from "@tanstack/react-query";

// configs
import { apiClient } from "@/common/configs";

// types
import { APISuccessResponse } from "@/common/types/api";
import { ImageUploadData } from "@/common/types/models/image-upload";

// fetcher
const uploadEventImageFetcher = (args: { data: FormData }) => {
  return apiClient
    .post<APISuccessResponse<ImageUploadData>>("/images", args.data)
    .then((res) => res.data);
};

// hook
export const useUploadEventImage = () => {
  return useMutation({
    mutationKey: ["uploadEventImage"],
    mutationFn: uploadEventImageFetcher,
  });
};
