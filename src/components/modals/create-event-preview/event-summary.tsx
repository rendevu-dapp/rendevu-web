// react

// imports
import { Avatar } from "@heroui/react";
import { getLocalTimeZone } from "@internationalized/date";
import Image from "next/image";
// next
import Link from "next/link";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  ChainIcon,
  ChainName,
  ChainProvider,
  TokenIcon,
  TokenProvider,
} from "thirdweb/react";

// configs
import { thirdwebClient } from "@/common/configs";
// data
import { defaultNativeToken, supportedTokens } from "@/common/data";

// helpers
import { compareAddress } from "@/common/helpers";
// schemas
import { CreateEventValues } from "@/common/schemas/create-event.schema";

const EventSummary = () => {
  // hooks
  const {
    details,
    chain,
    ticketing = [],
  } = useFormContext<CreateEventValues>().getValues();

  // derived state
  const networkSelectedTokens = useMemo(
    () =>
      chain ? [defaultNativeToken, ...(supportedTokens[chain.id] || [])] : [],
    [chain],
  );
  const ticketingTokensWithPrice = useMemo(() => {
    return (ticketing || []).map((ticket) => {
      const token = networkSelectedTokens.find((t) =>
        compareAddress(t.address, ticket.token),
      );
      return {
        ...ticket,
        ...(token || {}),
        price: ticket.price || "0",
      };
    });
  }, [ticketing, networkSelectedTokens]);

  return (
    <div className="bg-white dark:bg-[#181A1B] p-5 flex flex-col gap-6 border border-neutral-200 dark:border-[#343A40] rounded-2xl">
      {/* image, title and description */}
      <div className="grid grid-cols-[6rem_1fr] gap-2">
        {/* image */}
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden">
          <Image
            src={
              details.image
                ? URL.createObjectURL(details.image)
                : "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
            }
            alt="Event Image"
            fill
            className="object-cover"
          />
        </div>
        {/* title and description */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{details.title}</h3>
          <p className="text-sm leading-relaxed text-neutral-800 dark:text-gray-400">
            {details.description.length > 100
              ? `${details.description.slice(0, 100)}...`
              : details.description}
          </p>
        </div>
      </div>

      {/* event details */}
      <div className="pt-4 text-sm flex flex-col gap-3.5 border-t border-neutral-200 dark:border-[#343A40]">
        {/* network / chain */}
        <div className="flex justify-between gap-2">
          <span className="font-semibold text-placeholder">Network</span>
          <div className="font-medium">
            <ChainProvider chain={chain}>
              <div className="flex items-center gap-1">
                <ChainIcon
                  client={thirdwebClient}
                  className="text-tiny h-4.5 w-4.5"
                />
                <ChainName className="text-sm font-medium" />
              </div>
            </ChainProvider>
          </div>
        </div>
        {/* starts on */}
        <div className="flex justify-between gap-2">
          <span className="font-semibold text-placeholder">Starts On</span>
          <span className="font-medium">
            {details.startDate
              .toDate(getLocalTimeZone())
              .toLocaleDateString("en-US", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
          </span>
        </div>
        {/* ends on */}
        <div className="flex justify-between gap-2">
          <span className="font-semibold text-placeholder">Ends On</span>
          <span className="font-medium">
            {details.endDate
              .toDate(getLocalTimeZone())
              .toLocaleDateString("en-US", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </span>
        </div>
        {/* location */}
        {details.location && (
          <div className="flex justify-between gap-2">
            <span className="font-semibold text-placeholder">Location</span>
            <span className="font-medium capitalize">
              {details.location.name || "N/A"} -{" "}
              {details.location.address || "N/A"}
            </span>
          </div>
        )}
        {/* virtual link */}
        {details.virtualLink && (
          <div className="flex justify-between gap-2">
            <span className="font-semibold text-placeholder">Virtual Link</span>
            <Link
              href={details.virtualLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              {details.virtualLink}
            </Link>
          </div>
        )}
        {/* guest limit */}
        <div className="flex justify-between gap-2">
          <span className="font-semibold text-placeholder">Guest Limit</span>
          <span className="font-medium">
            {typeof details.guestLimit !== "number" || details.guestLimit === 0
              ? "Unlimited guests"
              : `${details.guestLimit} ${
                  details.guestLimit > 1 ? "guests" : "guest"
                }`}
          </span>
        </div>
        {/* requires approval */}
        <div className="flex justify-between gap-2">
          <span className="font-semibold text-placeholder">
            Requires Approval
          </span>
          <span className="font-medium">
            {details.requiresApproval ? "Yes" : "No"}
          </span>
        </div>
        {/* ticketing */}
        {ticketing.length > 0 && (
          <div className="pt-3 mt-1 flex gap-4 border-t border-gray-100">
            <span className="font-semibold text-placeholder">Ticketing</span>
            <div className="flex flex-row items-center gap-4 flex-1 justify-end">
              {ticketingTokensWithPrice.map((ticket, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <TokenProvider
                    key={ticket.token}
                    address={ticket.token}
                    client={thirdwebClient}
                    chain={chain}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <TokenIcon
                          width={16}
                          height={16}
                          loading="lazy"
                          loadingComponent={
                            <Avatar
                              src={ticket.icon}
                              alt={ticket.symbol}
                              size="sm"
                              className="h-7 w-7 bg-[#f2f4f7]"
                            />
                          }
                          fallbackComponent={
                            <Avatar
                              src={ticket.icon}
                              alt={ticket.symbol}
                              size="sm"
                              className="h-7 w-7 bg-[#f2f4f7]"
                            />
                          }
                        />
                        <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full bg-white p-0.5">
                          <ChainProvider chain={chain}>
                            <ChainIcon client={thirdwebClient} />
                          </ChainProvider>
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-black text-lg font-semibold">
                          {ticket.price}
                        </span>
                        <span className="text-xs font-semibold text-[#868E96]">
                          {ticket.symbol}
                        </span>
                      </div>
                    </div>
                  </TokenProvider>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSummary;
