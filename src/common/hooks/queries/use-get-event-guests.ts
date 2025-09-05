// imports
import {
  QueryHookOptions,
  SuspenseQueryHookOptions,
  useQuery,
  useSuspenseQuery,
} from "@apollo/client";

// graphql
import {
  GetEventGuestsDocument,
  type GetEventGuestsQuery,
  type GetEventGuestsQueryVariables,
} from "@/common/graphql/generated/graphql";

export const useGetEventGuestsList = (
  options?: QueryHookOptions<GetEventGuestsQuery, GetEventGuestsQueryVariables>,
) => {
  return useQuery<GetEventGuestsQuery, GetEventGuestsQueryVariables>(
    GetEventGuestsDocument,
    options,
  );
};

export const useSuspenseGetEventGuests = (
  options?: SuspenseQueryHookOptions<
    GetEventGuestsQuery,
    GetEventGuestsQueryVariables
  >,
) => {
  return useSuspenseQuery<GetEventGuestsQuery, GetEventGuestsQueryVariables>(
    GetEventGuestsDocument,
    options,
  );
};
