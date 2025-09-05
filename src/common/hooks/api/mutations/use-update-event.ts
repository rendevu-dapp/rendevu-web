// thirdweb

// hero-ui
import { addToast } from "@heroui/react";
// tanstack query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";

// hooks
import { useUploadEventImage } from "@/common/hooks/api/mutations";
// schemas
import { EditEventValues } from "@/common/schemas/edit-event.schema";
// types
import { Event } from "@/common/types/models/event";
// graphql
import { GetEventByIdDocument } from "@/graphql/generated/graphql";
import { updateEventFetcher } from "./update-event-fetcher";

export const useUpdateEvent = ({
  onEventUpdated,
}: { onEventUpdated?: () => void } = {}) => {
  const queryClient = useQueryClient();
  const account = useActiveAccount();
  const { mutateAsync: uploadEventImage } = useUploadEventImage();
  const { mutateAsync: sendAndConfirmTx } = useSendAndConfirmTransaction();

  return useMutation({
    mutationKey: ["updateEvent"],
    mutationFn: (args: { event: Event; formData: EditEventValues }) =>
      updateEventFetcher({
        ...args,
        account: account ?? null,
        uploadEventImage,
        sendAndConfirmTx,
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [GetEventByIdDocument, { id: data.id }],
      });

      addToast({
        title: "Event Updated",
        description: "Your event has been successfully updated",
        color: "success",
      });

      if (onEventUpdated) onEventUpdated();
    },
    onError(error) {
      console.error("Error updating event:", error);
      addToast({
        title: "Error updating event",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong updating your event.",
        color: "danger",
      });
    },
  });
};
