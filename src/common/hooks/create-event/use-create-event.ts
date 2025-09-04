// react

import { addToast, useDisclosure } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";
import { useForm } from "react-hook-form";
// imports
import {
  getContract,
  PreparedTransaction,
  prepareContractCall,
  toUnits,
} from "thirdweb";
import { useSendAndConfirmTransaction } from "thirdweb/react";
import { TransactionReceipt } from "viem";
// abis
import { eventPlatformAbi } from "@/common/abis/event-platform.abi";
// configs
import { thirdwebClient } from "@/common/configs";
// constants
import { eventPlatformContractAddress } from "@/common/constants";
// hooks
import {
  type UploadResponse,
  useUploadEventImage,
  useUploadFileOnGraphNode,
} from "@/common/hooks/api/mutations";
// schemas
import {
  CreateEventValues,
  createEventSchema,
} from "@/common/schemas/create-event.schema";

export const useCreateEvent = () => {
  // state
  const [isCreating, setIsCreating] = useState(false);

  // hooks
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();
  const { mutateAsync: uploadEventImage, isPending: isUploadingImage } =
    useUploadEventImage();
  const { mutateAsync: uploadFileOnGraphNode, isPending: isUploadingMetadata } =
    useUploadFileOnGraphNode();
  const { mutateAsync: sendAndConfirmTx, isPending: isSendingTransaction } =
    useSendAndConfirmTransaction();
  const methods = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema),
    mode: "all",
    defaultValues: {
      details: {
        requiresApproval: false,
      },
    },
  });

  // handlers
  const previewEvent = () => {
    const formData = methods.getValues();

    // validate chain
    if (!formData.chain) {
      addToast({
        title: "Network required",
        description: "Please select a network for the event",
        color: "danger",
      });
      return;
    }

    // open preview modal
    onModalOpen();
  };

  const createEvent = async (formData: CreateEventValues) => {
    // upload image to cloudinary
    const imageUploadFormData = new FormData();
    imageUploadFormData.append("file", formData.details.image!);
    const imageUploadResult = await uploadEventImage({
      data: imageUploadFormData,
    });

    if (imageUploadResult.error?.message) {
      // log error in prod
      throw new Error("Image upload error");
    }

    // prepare event input
    const startDate = formData.details.startDate.toDate(getLocalTimeZone());
    startDate.setHours(
      formData.details.startTime.hour,
      formData.details.startTime.minute,
    );
    const endDate = formData.details.endDate.toDate(getLocalTimeZone());
    endDate.setHours(
      formData.details.endTime.hour,
      formData.details.endTime.minute,
    );
    let venueType = 0; // default to 0 (in-person)
    if (formData.details.location && formData.details.virtualLink) {
      venueType = 2; // hybrid
    } else if (formData.details.virtualLink) {
      venueType = 1; // virtual
    }

    // prepare event metadata
    const metadata = {
      title: formData.details.title,
      description: formData.details.description,
      image: imageUploadResult.Response.url, // formData.details.image,
      virtualLink: formData.details.virtualLink,
      // location details (if available)
      ...(formData.details.location && {
        location: {
          ...formData.details.location,
          // convert latitude and longitude to string
          latitude: formData.details.location.latitude.toString(),
          longitude: formData.details.location.longitude.toString(),
        },
      }),
    };

    // convert metadata to file
    const blob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    const metadataFile = new File([blob], "data.json");

    // upload metadata to the graph ipfs node
    let uploadResponse: UploadResponse;
    try {
      uploadResponse = await uploadFileOnGraphNode({
        file: metadataFile,
      });
    } catch {
      // log error in prod
      throw new Error("Metadata upload error");
    }
    let metadataUri = uploadResponse.Hash;

    // remove ipfs:// from the CID
    if (metadataUri.startsWith("ipfs://")) {
      metadataUri = metadataUri.replace("ipfs://", "");
    }

    // event input
    const eventInput = {
      metadataHash: metadataUri,
      startDate: BigInt(Math.floor(startDate.getTime() / 1000)),
      endDate: BigInt(Math.floor(endDate.getTime() / 1000)),
      venueType: venueType,
      requiresApproval: formData.details.requiresApproval,
      capacity: BigInt(formData.details.guestLimit ?? 0),
      isPaid: Boolean((formData.ticketing ?? []).length),
      paymentTokens: (formData.ticketing ?? []).map((ticket) => ticket.token),
      ticketPrices: (formData.ticketing ?? []).map((ticket) =>
        toUnits(String(ticket.price), ticket.decimals ?? 18),
      ),
    };

    const eventPlatformContract = getContract({
      abi: eventPlatformAbi,
      address: eventPlatformContractAddress,
      chain: formData.chain,
      client: thirdwebClient,
    });

    // prepare contract call
    const transaction = prepareContractCall({
      contract: eventPlatformContract,
      method: "createEvent",
      params: [eventInput],
    }) as PreparedTransaction;

    // send transaction
    let tx: TransactionReceipt;
    try {
      tx = await sendAndConfirmTx(transaction);
    } catch {
      // log error in prod
      throw new Error("Transaction error");
    }

    return Promise.resolve(tx);
  };

  const handleSubmit = async () => {
    const formData = methods.getValues();

    setIsCreating(true);
    try {
      const tx = await createEvent(formData);

      methods.reset({
        details: {
          requiresApproval: false,
        },
      });

      return tx;
    } catch (error) {
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    methods,
    isCreating,
    isModalOpen,
    isUploadingImage,
    isUploadingMetadata,
    isSendingTransaction,
    previewEvent,
    handleSubmit,
    onModalOpenChange,
  };
};
