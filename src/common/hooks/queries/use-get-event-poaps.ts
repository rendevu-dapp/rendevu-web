// imports
import {
  QueryHookOptions,
  SuspenseQueryHookOptions,
  useQuery,
  useSuspenseQuery,
} from "@apollo/client";

// types
import {
  GetEventPoapsDocument,
  GetEventPoapsQuery,
  GetEventPoapsQueryVariables,
} from "@/common/graphql/generated/graphql";

// hooks
export const useGetEventPoaps = (
  options?: QueryHookOptions<GetEventPoapsQuery, GetEventPoapsQueryVariables>,
) => {
  return useQuery<GetEventPoapsQuery, GetEventPoapsQueryVariables>(
    GetEventPoapsDocument,
    options,
  );
};

export const useSuspenseGetEventPoaps = (
  options?: SuspenseQueryHookOptions<
    GetEventPoapsQuery,
    GetEventPoapsQueryVariables
  >,
) => {
  return useSuspenseQuery<GetEventPoapsQuery, GetEventPoapsQueryVariables>(
    GetEventPoapsDocument,
    options,
  );
};
