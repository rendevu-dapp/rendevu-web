import {
  Avatar,
  DrawerHeader,
  Image,
  Select,
  SelectItem,
  Tooltip,
} from "@heroui/react";
import { FC } from "react";
import {
  ChainIcon,
  ChainProvider,
  TokenIcon,
  TokenProvider,
} from "thirdweb/react";
import { thirdwebClient } from "@/common/configs";
import { supportedTokens } from "@/common/data";
import { normalizeAddress } from "@/common/helpers";
import { CreateEventValues } from "@/common/schemas/create-event.schema";

type PaymentTicketHeaderProps = {
  onClose: () => void;
  selectOpen: boolean;
  setSelectOpen: (open: boolean) => void;
  netWorkSelectedTokens: (typeof supportedTokens)[number][number][];
  fields: CreateEventValues["ticketing"];
  selectedChain: CreateEventValues["chain"];
  onTokenSelection: (keys: Set<string>) => void;
};

export const PaymentTicketHeader: FC<PaymentTicketHeaderProps> = ({
  onClose,
  selectOpen,
  setSelectOpen,
  netWorkSelectedTokens,
  fields,
  selectedChain,
  onTokenSelection,
}) => (
  <DrawerHeader className="border-default-200/50 flex flex-col gap-2 border-b">
    <div className="mb-3 flex w-full flex-row items-start justify-between gap-1">
      <div className="flex flex-col items-start gap-0.5">
        <h5 className="text-lg font-bold">Payment Tokens</h5>
        <p className="text-default-500 text-sm font-medium">
          Select the tokens you would like to gate event with
        </p>
      </div>
      <Tooltip content="Close">
        <div className="cursor-pointer " onClick={onClose}>
          <Image
            src="/images/round-close.svg"
            width={32}
            height={32}
            alt="Close"
          />
        </div>
      </Tooltip>
    </div>
    <div className="flex w-full flex-col gap-2">
      <Select
        size={"md"}
        items={netWorkSelectedTokens}
        variant="bordered"
        isOpen={selectOpen}
        isMultiline={true}
        placeholder="Select tokens"
        selectionMode="multiple"
        selectedKeys={
          new Set((fields ?? []).map((field) => normalizeAddress(field.token)))
        }
        onSelectionChange={(keys) => onTokenSelection(keys as Set<string>)}
        onOpenChange={setSelectOpen}
        renderValue={(items) => (
          <div className="flex flex-wrap gap-2.5">
            {items.map((item) => (
              <TokenProvider
                key={item.key}
                address={item.data!.address}
                client={thirdwebClient}
                chain={selectedChain}
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <TokenIcon
                      width={28}
                      height={28}
                      loading="lazy"
                      loadingComponent={
                        <Avatar
                          src={item.data?.icon}
                          alt={item.data?.symbol}
                          size="sm"
                          className="h-7 w-7 bg-[#f2f4f7]"
                        />
                      }
                      fallbackComponent={
                        <Avatar
                          src={item.data?.icon}
                          alt={item.data?.symbol}
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
                  <span className="text-xs font-semibold text-[#868E96]">
                    {item.data?.symbol}
                  </span>
                </div>
              </TokenProvider>
            ))}
          </div>
        )}
        classNames={{
          base: "w-full",
          trigger: "min-h-12 py-5 px-4 border rounded-3xl shadow-none",
        }}
      >
        {(token) => (
          <SelectItem key={token.address} textValue={token.name}>
            <TokenProvider
              address={token.address}
              client={thirdwebClient}
              chain={selectedChain}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <TokenIcon
                    width={28}
                    height={28}
                    loading="lazy"
                    loadingComponent={
                      <Avatar
                        src={token.icon}
                        alt={token.symbol}
                        size="sm"
                        className="h-7 w-7 bg-[#f2f4f7]"
                      />
                    }
                    fallbackComponent={
                      <Avatar
                        src={token.icon}
                        alt={token.symbol}
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
                <span className="text-xs font-medium">{token.symbol}</span>
              </div>
            </TokenProvider>
          </SelectItem>
        )}
      </Select>
    </div>
  </DrawerHeader>
);
