"use client";

// heroui
import { addToast, Button, Input } from "@heroui/react";
// hookform
import { zodResolver } from "@hookform/resolvers/zod";
// react
import React, { FC, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// thirdweb
import { Address } from "thirdweb";
import { useActiveAccount, useProfiles } from "thirdweb/react";
import { thirdwebClient } from "@/common/configs";

// hooks
import {
  useSetupUserProfile,
  useUpdateUserProfile,
} from "@/common/hooks/api/mutations";

// schemas
import {
  UpdateProfileSchema,
  updateProfileSchema,
} from "@/common/schemas/update-profile.schema";

// types
import { User } from "@/common/types/models/user";

type EditProfileTabAreaProps = {
  user?: User;
};

const EditProfileTabArea: FC<EditProfileTabAreaProps> = ({ user }) => {
  const account = useActiveAccount();
  const { data: profiles } = useProfiles({ client: thirdwebClient });
  const { mutateAsync: setUpUserProfile } = useSetupUserProfile();
  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  const profile = profiles?.at(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.fullName || "",
      username: user?.username || "",
      email: profile?.details.email || user?.email || "",
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileSchema> = useCallback(
    async (data) => {
      try {
        if (!account) {
          addToast({
            color: "warning",
            variant: "flat",
            title: "Please sign in or Connect your wallet",
            description:
              "Please sign in or connect your wallet to update your profile.",
          });
          return;
        }

        if (!user) {
          await setUpUserProfile({
            input: {
              fullName: data.name,
              username: data.username,
              email: data.email,
              walletAddress: account.address as Address,
            },
          });

          addToast({
            color: "success",
            variant: "flat",
            title: "Profile setup",
            description: "Your profile has been set up successfully.",
          });
        } else {
          await updateUserProfile({
            walletAddress: account.address as Address,
            input: {
              fullName: data.name,
              username: data.username,
            },
          });

          addToast({
            color: "success",
            variant: "flat",
            title: "Profile updated",
            description: "Your profile has been updated successfully.",
          });
        }
      } catch {
        addToast({
          color: "danger",
          variant: "flat",
          title: "Error updating profile",
          description: "There was an error updating your profile.",
        });
      }
    },
    [account, user, setUpUserProfile, updateUserProfile],
  );

  return (
    <div className="flex flex-col gap-4">
      <form
        id="edit-profile-form"
        noValidate
        method="POST"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[13px]"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="full_name"
              className="text-xs font-semibold text-[#868E96]"
            >
              Full Name
            </label>
            <Input
              id="full_name"
              type="text"
              variant="bordered"
              color="primary"
              placeholder="Enter full name here..."
              {...register("name")}
              classNames={{
                base: "h-14 rounded-[12px]",
                mainWrapper: "h-full",
                inputWrapper: "h-full border border-[#B5B5B5]",
                input:
                  "h-full px-4 placeholder:text-xs placeholder:font-semibold placeholder:text-[#DEE2E6]",
                errorMessage: "text-xs text-red-500 mt-1",
              }}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="user_name"
              className="text-xs font-semibold text-[#868E96]"
            >
              User Name
            </label>
            <Input
              id="user_name"
              type="text"
              variant="bordered"
              color="primary"
              placeholder="Enter user name here..."
              {...register("username")}
              classNames={{
                base: "h-14 rounded-[12px]",
                mainWrapper: "h-full",
                inputWrapper: "h-full border border-[#B5B5B5]",
                input:
                  "h-full px-4 placeholder:text-xs placeholder:font-semibold placeholder:text-[#DEE2E6]",
                errorMessage: "text-xs text-red-500 mt-1",
              }}
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-[#868E96]"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              variant="bordered"
              color="primary"
              placeholder="Enter email here..."
              {...register("email")}
              classNames={{
                base: "h-14 rounded-[12px]",
                mainWrapper: "h-full",
                inputWrapper: "h-full border border-[#B5B5B5]",
                input:
                  "h-full px-4 placeholder:text-xs placeholder:font-semibold placeholder:text-[#DEE2E6]",
                errorMessage: "text-xs text-red-500 mt-1",
              }}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="mr-auto h-[42px] rounded-[12px] bg-[#1A1E22] px-6 text-xs font-semibold text-white"
        >
          {isSubmitting ? "Saving Changes" : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default React.memo(EditProfileTabArea);
