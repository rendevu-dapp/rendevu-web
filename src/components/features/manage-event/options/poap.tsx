"use client";

// imports
import { Button, Card, CardBody } from "@heroui/react";
import Image from "next/image";
// next
import Link from "next/link";
// imports
import { FC } from "react";
// static assets
import poapPlaceholder from "@/../public/images/placeholders/poaps/image1.jpg";
// icon components
import { BoltIcon, EditPencilIcon } from "@/components/icons";

// types
type ManagePOAPProps = {
  eventId: string;
};

const ManagePOAP: FC<ManagePOAPProps> = ({ eventId }) => {
  return (
    <Card
      shadow="none"
      className="w-full py-3 px-3.5 border border-neutral-200 dark:border-[#343A40] dark:bg-[#181A1B] rounded-2xl"
    >
      <CardBody className="flex flex-row items-center justify-between flex-wrap gap-3 ">
        <div className="flex flex-row gap-1.5">
          <BoltIcon fill="#868E96" />
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">POAP</span>
            <span className="text-tiny font-medium text-placeholder">
              Add proof of attendance
            </span>
          </div>
        </div>
        <div>
          <Button
            as={Link}
            href={`/events/manage/${eventId}/poaps`}
            className="relative w-16 h-16 p-0 rounded-2xl overflow-x-hidden"
          >
            <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-200 w-6 h-6 flex items-center justify-center rounded-full">
              <EditPencilIcon size={15} />
            </div>
            <Image
              fill
              src={poapPlaceholder}
              alt="POAP image"
              placeholder="blur"
            />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ManagePOAP;
