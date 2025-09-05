import {
  LazyQueryHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import type {
  GetUserEventsQuery,
  GetUserEventsQueryVariables,
} from "@/common/graphql/generated/graphql";
import { GetUserEventsDocument } from "@/common/graphql/generated/graphql";

export const useGetUserEvents = (
  options?: QueryHookOptions<GetUserEventsQuery, GetUserEventsQueryVariables>,
) => {
  return useQuery<GetUserEventsQuery, GetUserEventsQueryVariables>(
    GetUserEventsDocument,
    options,
  );
};

export const useLazyGetUserEvents = (
  options?: LazyQueryHookOptions<
    GetUserEventsQuery,
    GetUserEventsQueryVariables
  >,
) => {
  return useLazyQuery<GetUserEventsQuery, GetUserEventsQueryVariables>(
    GetUserEventsDocument,
    options,
  );
};
