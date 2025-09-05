"use client";

// imports
import { Chip, Tooltip } from "@heroui/react";
// react
import { FC, Fragment } from "react";

// icons
import { KeyIcon, ShieldLockedIcon, WalletIcon } from "@/components/icons";

// types
type EventHeaderProps = {
  title?: string;
  isPaid?: boolean;
  requiresApproval?: boolean;
};

const Eventheader: FC<EventHeaderProps> = ({
  title = "Event title",
  isPaid = false,
  requiresApproval = false,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
      {/* event title */}
      <div className="flex flex-col gap-1.5">
        <h4 className="text-4xl font-bold">{title}</h4>
      </div>
      {/* event type and payment */}
      <div className="flex flex-row flex-wrap gap-2">
        {requiresApproval ? (
          <Fragment>
            {/* approval event */}
            <Tooltip content="This event requires host approval" size="sm">
              <Chip
                size="lg"
                classNames={{
                  base: "h-auto bg-[#FFF08B42] py-1.5 pr-2.5 items-center justify-between gap-1",
                  content: "text-xs font-bold",
                  avatar:
                    "bg-[#FFF8C6] w-auto h-auto p-1.5 flex items-center justify-center rounded-rounded",
                }}
                avatar={<ShieldLockedIcon size={16} />}
              >
                Approval Required
              </Chip>
            </Tooltip>
          </Fragment>
        ) : (
          <Fragment>
            {/* open event */}
            <Tooltip content="This event is open to all" size="sm">
              <Chip
                size="lg"
                classNames={{
                  base: "h-auto bg-[#8BFFB942] py-1.5 pr-2.5 items-center justify-between gap-1",
                  content: "text-xs font-bold",
                  avatar:
                    "bg-[#C6FFDD] w-auto h-auto p-1.5 flex items-center justify-center rounded-rounded",
                }}
                avatar={<KeyIcon size={16} />}
              >
                Open event
              </Chip>
            </Tooltip>
          </Fragment>
        )}
        {isPaid && (
          <Fragment>
            {/* paid event */}
            <Tooltip content="This event requires payment" size="sm">
              <Chip
                size="lg"
                classNames={{
                  base: "h-auto bg-[#8BCFFF42] py-1.5 pr-2.5 items-center justify-between gap-1",
                  content: "text-xs font-bold",
                  avatar:
                    "bg-[#C6E5FF] w-auto h-auto p-1.5 flex items-center justify-center rounded-rounded",
                }}
                avatar={<WalletIcon size={16} />}
              >
                Paid event
              </Chip>
            </Tooltip>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Eventheader;
