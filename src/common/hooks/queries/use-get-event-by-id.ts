import {
  LazyQueryHookOptions,
  SuspenseQueryHookOptions,
  useLazyQuery,
  useQuery,
  useSuspenseQuery,
} from "@apollo/client";
import type {
  GetEventByIdQuery,
  GetEventByIdQueryVariables,
} from "@/common/graphql/generated/graphql";
import { GetEventByIdDocument } from "@/common/graphql/generated/graphql";

export const useGetEventById = (args?: GetEventByIdQueryVariables) => {
  return useQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(
    GetEventByIdDocument,
    {
      variables: args,
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
    },
  );
};

export const useLazyGetEventById = (
  options?: LazyQueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>,
) => {
  return useLazyQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(
    GetEventByIdDocument,
    options,
  );
};

export const useSuspenseGetEventById = (
  options?: SuspenseQueryHookOptions<
    GetEventByIdQuery,
    GetEventByIdQueryVariables
  >,
) => {
  return useSuspenseQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(
    GetEventByIdDocument,
    options,
  );
};
