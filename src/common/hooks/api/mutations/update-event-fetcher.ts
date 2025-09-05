// thirdweb

import { getLocalTimeZone, toCalendarDateTime } from "@internationalized/date";
// date-fns
import { getUnixTime } from "date-fns";
// lodash
import isEqual from "lodash/isEqual";
import {
  getContract,
  PreparedTransaction,
  prepareContractCall,
  toTokens,
  toUnits,
} from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { upload as uploadIpfs } from "thirdweb/storage";
// abis
import { eventPlatformAbi } from "@/common/abis/event-platform.abi";
import { thirdwebClient } from "@/common/configs/third-web";
import { eventPlatformContractAddress } from "@/common/constants";
import { supportedTokens } from "@/common/data";
// helpers
import { compareAddress, normalizeAddress } from "@/common/helpers";

// schemas
import { EditEventValues } from "@/common/schemas/edit-event.schema";

// types
import { Event } from "@/common/types/models/event";

export const updateEventFetcher = async (args: {
  event: Event;
  formData: EditEventValues;
  account: { address: string } | null;
  uploadEventImage: (params: {
    data: FormData;
  }) => Promise<{ Response: { url: string }; error?: { message?: string } }>;
  sendAndConfirmTx: (tx: PreparedTransaction) => Promise<unknown>;
}) => {
  const { event, formData, account, uploadEventImage, sendAndConfirmTx } = args;

  if (!account) {
    throw new Error("Wallet not connected");
  }

  if (normalizeAddress(account.address) !== normalizeAddress(event.organizer)) {
    throw new Error("Only the event organizer can update this event");
  }

  if (!event.isActive) {
    throw new Error("This event is not active");
  }

  let imageUrl = formData.details.image;
  if (formData.details.image instanceof File) {
    if (formData.details.image.size === 0) {
      throw new Error("Selected image file is empty");
    }
    if (
      !["image/jpeg", "image/png", "image/gif"].includes(
        formData.details.image.type,
      )
    ) {
      throw new Error("Invalid image format. Use JPEG, PNG, or GIF.");
    }
    if (formData.details.image.size > 5 * 1024 * 1024) {
      throw new Error("Image file is too large. Maximum size is 5MB.");
    }
    const imageUploadFormData = new FormData();
    imageUploadFormData.append("file", formData.details.image);
    const imageUploadResult = await uploadEventImage({
      data: imageUploadFormData,
    });
    if (imageUploadResult.error?.message) {
      throw new Error(imageUploadResult.error.message);
    }
    imageUrl = imageUploadResult.Response.url;
  }

  const defaultValues = {
    chain: baseSepolia,
    details: {
      title: event.metadata?.title || "",
      description: event.metadata?.description || "",
      image: event.metadata?.image || "https://picsum.photos/400/300",
      startDate: event.startDate,
      startTime: event.startDate,
      endDate: event.endDate || event.startDate,
      endTime: event.endDate || "23:59",
      location: event.metadata?.location,
      virtualLink: event.metadata?.virtualLink || undefined,
      requiresApproval: event.requiresApproval || false,
      guestLimit: event.capacity || undefined,
    },
    ticketing:
      event.paymentTokens?.map((token) => {
        const tokenMetadata = supportedTokens[baseSepolia.id]?.find((t) =>
          compareAddress(t.address, token.tokenAddress),
        );
        const decimals = tokenMetadata?.decimals || 18;
        return {
          token: token.tokenAddress,
          price: Number(toTokens(BigInt(token.price), decimals)),
          decimals,
        };
      }) || [],
  };

  const metadataFieldsChanged = !isEqual(
    {
      title: formData.details.title,
      description: formData.details.description,
      image:
        formData.details.image instanceof File
          ? "FILE"
          : formData.details.image,
      location: formData.details.location,
      virtualLink: formData.details.virtualLink,
    },
    {
      title: defaultValues.details.title,
      description: defaultValues.details.description,
      image: defaultValues.details.image,
      location: defaultValues.details.location,
      virtualLink: defaultValues.details.virtualLink,
    },
  );

  let metadataHash: string;
  if (metadataFieldsChanged) {
    const metadata = {
      title: formData.details.title,
      description: formData.details.description,
      image: imageUrl,
      location: formData.details.location
        ? {
            id: formData.details.location.placeId || "N/A",
            name: formData.details.location.name,
            address: formData.details.location.address || "N/A",
            placeId: formData.details.location.placeId || "N/A",
            latitude: formData.details.location.latitude.toString(),
            longitude: formData.details.location.longitude.toString(),
          }
        : null,
      virtualLink: formData.details.virtualLink || null,
    };

    const uri = await uploadIpfs({
      client: thirdwebClient,
      files: [metadata],
      uploadWithoutDirectory: true,
    });
    metadataHash = uri.replace("ipfs://", "");
  } else {
    metadataHash = event.metadataHash;
  }

  const startDateTime = toCalendarDateTime(
    formData.details.startDate,
    formData.details.startTime,
  );
  const endDateTime = toCalendarDateTime(
    formData.details.endDate,
    formData.details.endTime,
  );

  const venueTypes: Record<string, number> = {
    Physical: 0,
    Online: 1,
    Hybrid: 2,
  };
  const venueType =
    event.venueType in venueTypes ? venueTypes[event.venueType] : 0;

  const ticketing = formData.ticketing || [];
  const isPaid = ticketing.length > 0;
  const paymentTokens = ticketing.map((ticket) => ticket.token);
  const ticketPrices = ticketing.map((ticket) =>
    toUnits(String(ticket.price), ticket.decimals),
  );

  if (paymentTokens.length !== ticketPrices.length) {
    throw new Error(
      "Payment tokens and ticket prices arrays must have the same length",
    );
  }

  const eventInput = {
    metadataHash,
    startDate: BigInt(getUnixTime(startDateTime.toDate(getLocalTimeZone()))),
    endDate: BigInt(getUnixTime(endDateTime.toDate(getLocalTimeZone()))),
    venueType,
    requiresApproval: formData.details.requiresApproval,
    capacity: BigInt(formData.details.guestLimit || 0),
    isPaid,
    paymentTokens,
    ticketPrices,
  };

  const eventInputChanged = !isEqual(
    {
      metadataHash,
      startDate: eventInput.startDate,
      endDate: eventInput.endDate,
      venueType: eventInput.venueType,
      requiresApproval: eventInput.requiresApproval,
      capacity: eventInput.capacity,
      isPaid: eventInput.isPaid,
      paymentTokens: eventInput.paymentTokens,
      ticketPrices: eventInput.ticketPrices.map(String),
    },
    {
      metadataHash: event.metadataHash,
      startDate: BigInt(event.startDate),
      endDate: BigInt(event.endDate || event.startDate),
      venueType: venueTypes[event.venueType] || 0,
      requiresApproval: event.requiresApproval,
      capacity: BigInt(event.capacity || 0),
      isPaid: event.paymentTokens && event.paymentTokens.length > 0,
      paymentTokens: event.paymentTokens?.map((t) => t.tokenAddress) || [],
      ticketPrices: event.paymentTokens?.map((t) => String(t.price)) || [],
    },
  );

  if (!metadataFieldsChanged && !eventInputChanged) {
    throw new Error("No changes detected to update.");
  }

  let parsedEventId: bigint;
  try {
    parsedEventId = BigInt(event.eventId);
    if (parsedEventId <= 0) throw new Error("Invalid event ID");
  } catch {
    throw new Error("Invalid event ID format");
  }

  const eventPlatformContract = getContract({
    abi: eventPlatformAbi,
    address: eventPlatformContractAddress,
    chain: baseSepolia,
    client: thirdwebClient,
  });

  const transaction = prepareContractCall({
    contract: eventPlatformContract,
    method: "updateEvent",
    params: [parsedEventId, eventInput],
  });
  await sendAndConfirmTx(transaction as PreparedTransaction);

  return {
    id: event.id,
  };
};
