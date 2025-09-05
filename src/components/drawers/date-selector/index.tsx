"use client";

import {
  Button,
  Calendar,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Radio,
  RadioGroup,
  RangeCalendar,
} from "@heroui/react";
import {
  DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { FC, Fragment, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

type DateSelectorDrawerProps = {
  title?: string;
  buttonText?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDateSelect: (date: { start: string; end?: string }) => void;
  selectedDate: { start: string; end?: string };
};

export const DateSelectorDrawer: FC<DateSelectorDrawerProps> = ({
  isOpen,
  title = "Filter by Date",
  buttonText = "Apply Filters",
  onOpenChange,
  onDateSelect,
  selectedDate,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mode, setMode] = useState<"single" | "range">(
    selectedDate.end ? "range" : "single",
  );
  const [singleDate, setSingleDate] = useState<DateValue>(
    selectedDate.start
      ? parseDate(selectedDate.start)
      : today(getLocalTimeZone()),
  );
  const [dateRange, setDateRange] = useState<{
    start: DateValue;
    end: DateValue;
  }>({
    start: selectedDate.start
      ? parseDate(selectedDate.start)
      : today(getLocalTimeZone()),
    end: selectedDate.end
      ? parseDate(selectedDate.end)
      : today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const handleApply = () => {
    if (mode === "single") {
      onDateSelect({ start: singleDate.toString() });
    } else {
      onDateSelect({
        start: dateRange.start.toString(),
        end: dateRange.end.toString(),
      });
    }
    onOpenChange(false);
  };

  return (
    <Drawer
      size="sm"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        {() => (
          <Fragment>
            <DrawerHeader className="flex flex-col gap-3">
              <h5 className="text-large font-extrabold">{title}</h5>
              <RadioGroup
                value={mode}
                onValueChange={(value) => setMode(value as "single" | "range")}
                orientation="horizontal"
                classNames={{ wrapper: "gap-4" }}
              >
                <Radio value="single">Single Date</Radio>
                <Radio value="range">Date Range</Radio>
              </RadioGroup>
            </DrawerHeader>
            <DrawerBody className="items-center">
              {mode === "single" ? (
                <Calendar
                  aria-label="Single Date"
                  value={singleDate}
                  onChange={setSingleDate}
                  minValue={today(getLocalTimeZone())}
                />
              ) : (
                <RangeCalendar
                  aria-label="Date Range"
                  value={dateRange}
                  onChange={setDateRange}
                  minValue={today(getLocalTimeZone())}
                />
              )}
            </DrawerBody>
            <DrawerFooter>
              <Button
                size={isMobile ? "md" : "lg"}
                onPress={handleApply}
                className="w-full bg-primary-500 text-white text-small font-medium rounded-rounded"
              >
                {buttonText}
              </Button>
            </DrawerFooter>
          </Fragment>
        )}
      </DrawerContent>
    </Drawer>
  );
};
