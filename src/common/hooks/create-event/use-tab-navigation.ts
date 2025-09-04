// react

// imports
import { addToast } from "@heroui/react";
import { Key, useState } from "react";
import { UseFormReturn } from "react-hook-form";

// schemas
import {
  CreateEventValues,
  eventDetailsSchema,
} from "@/common/schemas/create-event.schema";

// types
export type TabType = "create" | "ticket";
interface UseTabNavigationProps {
  methods: UseFormReturn<CreateEventValues>;
}

export const useTabNavigation = ({ methods }: UseTabNavigationProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>("create");

  const handleTabSelection = async (key: Key) => {
    if (key === "ticket" && selectedTab === "create") {
      const eventDetails = methods.getValues("details");

      // validate event details
      const validationResult = eventDetailsSchema.safeParse(eventDetails);
      if (!validationResult.success) {
        validationResult.error.issues.forEach((issue) => {
          methods.setError(
            `details.${issue.path.join(".")}` as keyof CreateEventValues,
            {
              type: "manual",
              message: issue.message,
            },
          );
        });
        addToast({
          title: "Validation Error",
          description: "Please fix the errors before proceeding",
          color: "danger",
        });
      }

      // check if image is selected
      const hasImage = !!eventDetails.image;
      if (!hasImage) {
        methods.setError("details.image", {
          type: "manual",
          message: "Image is required to proceed to ticketing",
        });
        addToast({
          title: "Image Required",
          description: "Please select an image to proceed to ticketing",
          color: "danger",
        });
      }

      if (!validationResult.success || !hasImage) {
        return;
      }
    }
    setSelectedTab(key.toString() as TabType);
  };

  const handleTabMoveNext = async () => {
    if (selectedTab === "create") {
      const eventDetails = methods.getValues("details");

      // validate event details
      const validationResult = eventDetailsSchema.safeParse(eventDetails);
      if (!validationResult.success) {
        validationResult.error.issues.forEach((issue) => {
          methods.setError(
            `details.${issue.path.join(".")}` as keyof CreateEventValues,
            {
              type: "manual",
              message: issue.message,
            },
          );
        });
        addToast({
          title: "Validation Error",
          description: "Please fix the errors before proceeding",
          color: "danger",
        });
      }

      // check if image is selected
      const hasImage = !!eventDetails.image;
      if (!hasImage) {
        methods.setError("details.image", {
          type: "manual",
          message: "Image is required to proceed to ticketing",
        });
        addToast({
          title: "Image Required",
          description: "Please select an image to proceed to ticketing",
          color: "danger",
        });
      }

      if (!validationResult.success || !hasImage) {
        return;
      }

      setSelectedTab("ticket");
    } else if (selectedTab === "ticket") {
      await methods.trigger(["ticketing"]);
    }
  };

  const handleTabMoveBack = async () => {
    if (selectedTab === "ticket") {
      const isValid = await methods.trigger(["details"]);
      if (isValid) {
        setSelectedTab("create");
      }
    }
  };

  return {
    selectedTab,
    handleTabSelection,
    handleTabMoveNext,
    handleTabMoveBack,
  };
};
