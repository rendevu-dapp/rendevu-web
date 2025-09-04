// imports
import { Address } from "thirdweb";

export type CreateUserInput = {
  walletAddress: Address; // Required, valid Ethereum address
  email: string; // Required, valid email
  fullName: string; // Required, non-empty
  username: string; // Required, non-empty
  avatar?: string; // Optional, valid URL
  notificationsAllowed?: boolean; // Optional
};

export type UpdateUserInput = {
  fullName?: string; // Optional, non-empty if provided
  username?: string; // Optional, non-empty if provided
  avatar?: string; // Optional, valid URL if provided
  notificationsAllowed?: boolean; // Optional
};
