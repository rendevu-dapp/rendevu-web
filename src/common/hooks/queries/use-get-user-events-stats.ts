// imports
import { QueryHookOptions, useQuery } from "@apollo/client";
// types
import type {
  GetUserEventsStatsQuery,
  GetUserEventsStatsQueryVariables,
  // @ts-expect-error err
} from "@/common/graphql/generated/graphql";
// graphql
import { GetUserEventsStatsDocument } from "@/common/graphql/generated/graphql";

export const useGetUserEventsStats = (
  options: QueryHookOptions<
    GetUserEventsStatsQuery,
    GetUserEventsStatsQueryVariables
  >,
) => {
  return useQuery<GetUserEventsStatsQuery, GetUserEventsStatsQueryVariables>(
    GetUserEventsStatsDocument,
    options,
  );
};
