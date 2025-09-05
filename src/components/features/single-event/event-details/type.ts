// imports
import { GetEventByIdQuery } from "@/common/graphql/generated/graphql";

// types
type Event = NonNullable<GetEventByIdQuery["event"]>;
type Metadata = NonNullable<Event["metadata"]>;
export type Ticket = NonNullable<Event["tickets"]>[number];
export type Location = NonNullable<Metadata["location"]>;
export type Registration = NonNullable<Event["registrations"]>[number];
export type PaymentToken = NonNullable<Event["paymentTokens"]>[number];
