import { GetEventPoapsQuery } from "@/common/graphql/generated/graphql";

type Event = NonNullable<GetEventPoapsQuery["eventById"]>;
export type Poap = NonNullable<Event["poaps"]>[number];
