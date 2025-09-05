// react

// heroui
import { addToast, Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useState } from "react";
// imports
import { SubmitHandler, useForm } from "react-hook-form";
import { useActiveAccount } from "thirdweb/react";
import { z } from "zod";

// configs
import { apiClient } from "@/common/configs";

// schemas
import { inviteGuestsSchema } from "@/common/schemas/send-invite.schema";

// types
import { User } from "@/common/types/models/user";

type InviteGuestsForm = z.infer<typeof inviteGuestsSchema>;

type InviteGuestsProps = {
  eventId: string;
  className?: string;
  user?: User;
};

const InviteGuests: FC<InviteGuestsProps> = ({
  eventId,
  className = "",
  user,
}) => {
  const account = useActiveAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteGuestsForm>({
    resolver: zodResolver(inviteGuestsSchema),
    defaultValues: {
      emails: "",
    },
  });

  const onSubmit: SubmitHandler<InviteGuestsForm> = useCallback(
    async (data) => {
      if (!account) {
        addToast({
          color: "warning",
          title: "Please connect your wallet to send invitations.",
        });
        return;
      }

      if (!user) {
        addToast({
          color: "warning",
          title: "Please set up your profile to send invitations.",
        });
        return;
      }

      try {
        setIsSubmitting(true);
        const guestEmails = data.emails.split(",").map((email) => email.trim());
        await apiClient.post("/event-triggers/invite-guests", {
          event_id: eventId,
          guest_emails: guestEmails,
        });

        addToast({
          color: "success",
          title: "Invitations sent",
          description: "Invitations have been sent successfully.",
        });
        reset();
      } catch (error) {
        addToast({
          color: "danger",
          title: "Error sending invitations",
          description:
            (error as Error)?.message || "Failed to send invitations.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [account, eventId, user, reset],
  );

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <h4 className="text-sm font-bold text-muted-foreground">
        Invite guests via email
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Enter email addresses, separated by commas"
          {...register("emails")}
          isInvalid={!!errors.emails}
          errorMessage={errors.emails?.message}
          classNames={{
            base: "h-14 rounded-[12px]",
            mainWrapper: "h-full",
            inputWrapper: "h-full border border-[#6B7280]",
            input:
              "h-full px-4 text-sm font-normal placeholder:text-sm placeholder:font-normal placeholder:text-[#6B7280] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]",
            errorMessage: "text-xs text-red-500 mt-1",
          }}
        />
        <Button
          type="submit"
          disabled={isSubmitting || !user || !account}
          isLoading={isSubmitting}
          className="mr-auto h-[42px] rounded-[12px] bg-[#1A1E22] px-6 text-xs font-semibold text-white dark:border dark:border-[#343A40]"
        >
          {isSubmitting ? "Sending Invitations" : "Send Invitations"}
        </Button>
      </form>
    </div>
  );
};

export default InviteGuests;
