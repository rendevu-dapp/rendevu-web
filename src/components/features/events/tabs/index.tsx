"use client";

// imports
import { Tab, Tabs } from "@heroui/react";
// react
import { FC } from "react";

// types
type EventListTabsProps = {
  activeTab?: "upcoming" | "past";
  onTabChange: (value: "upcoming" | "past") => void;
};

const EventListTabs: FC<EventListTabsProps> = ({
  activeTab = "upcoming",
  onTabChange,
}) => {
  return (
    <Tabs
      radius="md"
      color="default"
      classNames={{
        tab: "h-auto py-3 px-6 font-semibold",
      }}
      selectedKey={activeTab}
      onSelectionChange={(key) => onTabChange(key as "upcoming" | "past")}
      aria-label="Events List Tabs"
    >
      <Tab key="upcoming" title="Upcoming Events" />
      <Tab key="past" title="Past Events" />
    </Tabs>
  );
};

export default EventListTabs;
