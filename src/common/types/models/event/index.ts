export type Registration = {
  id: string;
  approved: boolean | null;
  attendee: string;
  approvedAt: string | null;
  registeredAt: string;
  ticket: {
    id: string;
    payment: {
      amount: string;
      token: {
        id?: string;
        tokenAddress: string;
      };
      payer?: string;
    } | null;
  } | null;
};

export type Event = {
  __typename?: "Event";
  id: string;
  eventId: string;
  metadataHash: string;
  isPaid: boolean;
  isActive: boolean;
  capacity: string | null;
  organizer: string;
  startDate: string;
  endDate: string;
  venueType: string;
  requiresApproval: boolean;
  metadata: {
    __typename?: "EventMetadata";
    title: string;
    description: string;
    image: string | null;
    location: {
      __typename?: "Location";
      id: string;
      name: string;
      address: string | null;
      placeId: string | null;
      latitude: string;
      longitude: string;
    } | null;
    virtualLink: string | null;
  } | null;
  tickets: {
    id: string;
    attendee: string;
    payment: {
      amount: string; // Maps to BigInt
      token: {
        id: string;
        tokenAddress: string;
      };
      payer: string;
    } | null;
    registration: Registration | null;
    issuedAt: string; // Maps to BigInt
  }[];
  paymentTokens: {
    tokenAddress: string;
    price: string; // Maps to BigInt
  }[];
  payments: { amount: string }[]; // Maps to BigInt
  registrations?: Registration[];
};

// // src/common/types/models/event/index.ts

// export type Registration = {
//   id: string;
//   approved: boolean | null;
//   attendee: string;
//   approvedAt: string | null;
//   registeredAt: string;
//   ticket: {
//     id: string;
//     payment: {
//       amount: string;
//       token: {
//         id?: string;
//         tokenAddress: string;
//       };
//       payer?: string;
//     } | null;
//   } | null;
// };

// export type Event = {
//   __typename?: 'Event';
//   id: string;
//   eventId: string;
//   metadataHash: string;
//   isPaid: boolean;
//   isActive: boolean;
//   capacity: number | null;
//   organizer: string;
//   startDate: string;
//   endDate: string;
//   venueType: string;
//   requiresApproval: boolean;
//   metadata:
//     | {
//         __typename?: 'EventMetadata';
//         title: string;
//         description: string;
//         image: string | null;
//         location: {
//           __typename?: 'Location';
//           id: string;
//           name: string;
//           address: string;
//           placeId: string;
//           latitude: string;
//           longitude: string;
//         } | null;
//         virtualLink: string | null;
//       }
//     | null
//     | undefined;
//   tickets: {
//     id: string;
//     attendee: string | null;
//     payment: {
//       amount: string;
//       token: {
//         id: string;
//         tokenAddress: string;
//       };
//       payer: string;
//     } | null;
//     registration: Registration | null;
//     issuedAt: string;
//   }[];
//   paymentTokens: {
//     tokenAddress: string;
//     price: string;
//   }[];
//   payments: { amount: string }[];
//   registrations?: Registration[];
// };
