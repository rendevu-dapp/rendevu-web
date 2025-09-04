// import s
import { useMutation } from "@tanstack/react-query";

// types
export type UploadResponse = {
  Hash: string;
  Name: string;
  Size: string;
};
type UploadFileOnGraphNodeArgs = {
  file: File;
};

// fetcher
const uploadFileOnGraphNodeFetcher = async ({
  file,
}: UploadFileOnGraphNodeArgs): Promise<UploadResponse> => {
  // create a FormData object to send the file to the graph node
  const formData = new FormData();
  formData.append("file", file);

  // create a request to the graph node
  const res = await fetch("https://api.thegraph.com/ipfs/api/v0/add", {
    method: "POST",
    body: formData,
  });

  // return the response
  const result = (await res.json()) as UploadResponse;
  return result;
};

// hooks
export const useUploadFileOnGraphNode = () => {
  return useMutation({
    mutationKey: ["uploadFileOnGraphNode"],
    mutationFn: uploadFileOnGraphNodeFetcher,
  });
};
