// react

import { Avatar, Card, CardBody, Image } from "@heroui/react";
// imports
import { PlusIcon } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  ChainIcon,
  ChainProvider,
  TokenIcon,
  TokenProvider,
} from "thirdweb/react";

// configs
import { thirdwebClient } from "@/common/configs";
// data
import { defaultNativeToken, supportedTokens } from "@/common/data";

// helpers
import { classnames, compareAddress } from "@/common/helpers";

// schemas
import { CreateEventValues } from "@/common/schemas/create-event.schema";
// components
import { PaymentTicketDrawer } from "@/components/drawers";

export const PaymentTickets = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    watch,
    formState: { errors },
  } = useFormContext<CreateEventValues>();
  const ticketingDetails = watch("ticketing");
  const selectedChain = watch("chain");

  const netWorkSelectedTokens = useMemo(
    () =>
      selectedChain
        ? [defaultNativeToken, ...(supportedTokens[selectedChain.id] || [])]
        : [],
    [selectedChain],
  );
  const ticketingTokensWithPrice = useMemo(() => {
    return (ticketingDetails || []).map((ticket) => {
      const token = netWorkSelectedTokens.find((t) =>
        compareAddress(t.address, ticket.token),
      );
      return {
        ...ticket,
        ...(token || {}),
        price: ticket.price || "0",
      };
    });
  }, [ticketingDetails, netWorkSelectedTokens]);

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-bold text-[#868E96]">Tickets</span>
      <Card
        shadow="none"
        isPressable
        onPress={() => setIsDrawerOpen(true)}
        className={classnames(
          "w-full rounded-4xl border border-[#E9ECEF] dark:border-[#343A40]",
          {
            "bg-danger-50 hover:bg-danger-100 border-danger-100": Boolean(
              errors.ticketing,
            ),
          },
        )}
      >
        <CardBody className="p-6 dark:bg-[#181A1B]">
          <div className="flex w-full flex-row items-center justify-between gap-3">
            <div className="flex flex-row items-start gap-4">
              <Image
                src="/images/dark-ticket-alt.svg"
                alt="ticket icon"
                width={20}
                height={20}
                className="min-w-[20px] min-h-[20px]"
              />
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-[#343A40] dark:text-gray-300">
                  Payment Tickets
                </span>
                {!ticketingDetails?.length ? (
                  <span className="text-[13px] md:text-sm font-medium text-[#868E96]">
                    Let your attendees buy tickets to your event
                  </span>
                ) : (
                  <div className="flex flex-row items-center gap-5">
                    {ticketingTokensWithPrice.map((ticket, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <TokenProvider
                          key={ticket.token}
                          address={ticket.token}
                          client={thirdwebClient}
                          chain={selectedChain}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="relative">
                              <TokenIcon
                                width={28}
                                height={28}
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
                                className="w-7 h-7"
                              />
                              <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full bg-white p-0.5">
                                <ChainProvider chain={selectedChain}>
                                  <ChainIcon client={thirdwebClient} />
                                </ChainProvider>
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-black dark:text-gray-200 text-lg font-semibold">
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
                )}
              </div>
            </div>
            <div className="min-w-[15px] min-h-[15px]">
              <PlusIcon weight="bold" size={15} color="#868E96" />
            </div>
          </div>
        </CardBody>
      </Card>
      {errors.ticketing && (
        <div data-slot="error-message" className="text-tiny text-danger">
          {errors.ticketing.message}
        </div>
      )}
      <PaymentTicketDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
};
