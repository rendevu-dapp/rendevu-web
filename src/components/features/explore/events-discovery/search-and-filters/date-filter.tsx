"use client";

// heroui
import { Button, useDisclosure } from "@heroui/react";
// react
import { Fragment, useState } from "react";
// drawer components
import { DateSelectorDrawer } from "@/components/drawers";
// icon components
import { CalendarDotsIcon } from "@/components/icons";

type DateFilterProps = {
  onChange: (date: { start: string; end?: string }) => void;
  date: { start: string; end?: string };
};

const DateFilter: React.FC<DateFilterProps> = ({ onChange, date }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<{
    start: string;
    end?: string;
  }>(date);

  const handleDateChange = (newDate: { start: string; end?: string }) => {
    setSelectedDate(newDate);
    onChange(newDate);
  };

  return (
    <Fragment>
      <Button
        size="lg"
        isIconOnly
        aria-label="Calendar"
        onPress={onOpen}
        className="text-white bg-black dark:bg-white dark:text-black"
      >
        <CalendarDotsIcon fill="white" />
      </Button>
      <DateSelectorDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onDateSelect={handleDateChange}
        selectedDate={selectedDate}
      />
    </Fragment>
  );
};

export default DateFilter;
