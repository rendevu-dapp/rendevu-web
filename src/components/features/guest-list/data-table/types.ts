// imports

import { GetEventGuestsQuery } from "@/common/graphql/generated/graphql";
import { User } from "@/common/types/models/user";

type Event = NonNullable<GetEventGuestsQuery["event"]>;
type Payment = NonNullable<Event["payments"]>[number];
type Registration = NonNullable<Event["registrations"]>[number];

type PaymentToeken = {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  icon: string;
  price: string;
};
export type GuestPayment = Omit<Payment, "token"> & {
  token?: PaymentToeken;
};
export type GuestWithProfile = {
  address: string;
  status: "accepted" | "pending" | "rejected";
  payment?: GuestPayment | null;
  registration?: Registration | null;
  registeredAt: string;
  user?: User | null;
};
