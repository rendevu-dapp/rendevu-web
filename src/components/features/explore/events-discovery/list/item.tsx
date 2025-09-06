"use client";

// imports
import { Card, CardFooter } from "@heroui/react";
import Image, { StaticImageData } from "next/image";
// next
import Link from "next/link";
// react
import { FC, useState } from "react";
import { toTokens } from "thirdweb";
import { base } from "thirdweb/chains";
import { TokenIcon, TokenProvider, TokenSymbol } from "thirdweb/react";
import { thirdwebClient } from "@/common/configs";

interface PaymentToken {
  tokenAddress: string; // Contract address of the token
  price: string;
  id: string; // Unique identifier for the token
}
// types
type EventCardProps = {
  id: string;
  title: string;
  startDate: string;
  startTime: string;
  endTime: string;
  image: string | StaticImageData;
  paymentTokens?: PaymentToken[];
  isPaid?: boolean;
  classname?: string;
};

const EventCard: FC<EventCardProps> = ({
  id,
  title,
  image,
  isPaid = false,
  paymentTokens = [],
  startDate,
  startTime,
  endTime,
}) => {
  const [showPaymentTokens, setShowPaymentTokens] = useState(false);

  const handlePriceHover = (show: boolean) => {
    if (isPaid && paymentTokens.length > 0) {
      setShowPaymentTokens(show);
    }
  };
  return (
    <Card
      as={Link}
      href={`/e/${id}`}
      isPressable
      isFooterBlurred
      className="relative h-60 items-center border-none rounded-5xl"
    >
      <div className="absolute top-2.5 right-2.5 z-10 bg-[#1A1E22]/60 py-1 px-3 border-1 border-neutral-600/50 rounded-3xl">
        {!isPaid ? (
          <span className="px-3 py-1 text-sm text-white">Free</span>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => handlePriceHover(true)}
            onMouseLeave={() => handlePriceHover(false)}
          >
            <span className="px-3 py-1 text-sm text-white transition-all duration-200">
              Paid
            </span>

            {/* Payment Tokens Dropdown */}
            {showPaymentTokens && paymentTokens.length > 0 && (
              <div className="absolute top-full right-0 z-10 mt-2 min-w-48 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                <div className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                  Payment Options
                </div>
                <div className="space-y-2">
                  {paymentTokens.map((token) => (
                    <div
                      key={token?.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <TokenProvider
                        client={thirdwebClient}
                        address={token?.tokenAddress}
                        chain={base}
                      >
                        <div className="flex items-center gap-2">
                          <TokenIcon
                            height={16}
                            width={16}
                            className="rounded-full"
                          />

                          <TokenSymbol className="font-medium text-gray-700" />
                        </div>
                        <span className="font-bold text-gray-900">
                          {toTokens(BigInt(token?.price), 18)}
                        </span>
                      </TokenProvider>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Image
        alt="Woman listing to music"
        src={image}
        width={400}
        height={300}
        loading="eager"
        className="rounded-t-lg object-cover w-full h-full md:h-64 lg:h-72 xl:h-80 2xl:h-96"
      />
      <CardFooter className="absolute bottom-2 z-10 w-[calc(100%_-_16px)] bg-[#252525]/70 py-4 flex-col !items-start border-1 border-neutral-600 rounded-large shadow-small overflow-hidden before:bg-white/10 before:rounded-xl">
        <h5 className="text-lg text-white font-bold text-start">{title}</h5>
        <p className="text-tiny text-neutral-300 text-start flex overflow-y-auto max-h-4">
          {startTime} - {startDate}, {endTime}
        </p>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
