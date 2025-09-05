// event data graphql
export interface EventData {
  id: string;
  eventId: string;
  metadataHash: string;
  metadata: {
    title: string;
    description: string;
    image: string | null;
    location: {
      id: string;
      name: string;
      address?: string | null;
      placeId?: string | null;
      latitude: string;
      longitude: string;
    } | null;
    virtualLink: string | null;
  };
  isPaid: boolean;
  isActive: boolean;
  capacity?: string;
  organizer: string;
  startDate: string;
  endDate: string;
  venueType?: string;
  tickets: Array<{
    tokenAddress: string;
    price: string;
  }>;
  requiresApproval?: boolean;
}

// event document typesense
export type EventDocument = {
  id: string;
  eventId: number;
  organizer: string;
  startDate: number;
  endDate: number;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
  isPaid: boolean;
  requiresApproval: boolean;
  venueType: string;
  capacity: number;
  metadata: {
    title: string;
    description: string;
    image: string;
    virtualLink: string;
    location: {
      name: string;
      address: string;
      latitude: string;
      longitude: string;
      placeId: string;
    };
  };
  paymentTokens: Array<{
    tokenAddress: string;
    price: number;
  }>;
  registrations: Array<{
    attendee: string;
    status: string;
    registeredAt: number;
  }>;
  tickets: Array<{
    attendee: string;
    isUsed: boolean;
    issuedAt: number;
  }>;
  payments: Array<{
    payer: string;
    amount: number;
    isRefunded: boolean;
  }>;
  lastUpdatedBlockTimestamp: number;
};
