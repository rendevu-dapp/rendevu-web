// react

import { Avatar, Select, SelectItem } from "@heroui/react";
import { FC } from "react";
import { base } from "thirdweb/chains";
// imports
import {
  ChainIcon,
  ChainProvider,
  TokenIcon,
  TokenProvider,
  useActiveWalletChain,
} from "thirdweb/react";

// configs
import { thirdwebClient } from "@/common/configs";
// data
import { supportedTokens } from "@/common/data";
// helpers
import { normalizeAddress } from "@/common/helpers";

// types
type TokensSelectProps = {
  fields: { token: string; price: number; decimals: number }[];
  selectOpen: boolean;
  networkSelectedTokens: (typeof supportedTokens)[number][number][];
  setSelectOpen: (open: boolean) => void;
  handleTokenSelection: (keys: Set<string>) => void;
};

const TokensSelect: FC<TokensSelectProps> = ({
  fields,
  selectOpen,
  networkSelectedTokens,
  setSelectOpen,
  handleTokenSelection,
}) => {
  // hooks
  const activeChain = useActiveWalletChain() || base;

  return (
    <Select
      aria-label="Select tokens"
      size={"md"}
      items={networkSelectedTokens}
      variant="bordered"
      isOpen={selectOpen}
      isMultiline={true}
      placeholder="Select tokens"
      selectionMode="multiple"
      selectedKeys={
        new Set(fields.map((field) => normalizeAddress(field.token)))
      }
      onSelectionChange={(keys) => handleTokenSelection(keys as Set<string>)}
      onOpenChange={setSelectOpen}
      renderValue={(items) => (
        <div className="flex flex-wrap gap-2.5">
          {items.map((item) => (
            <TokenProvider
              key={item.key}
              address={item.data!.address}
              client={thirdwebClient}
              chain={activeChain!}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <TokenIcon
                    width={16}
                    height={16}
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
                  />
                  <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full bg-white p-0.5">
                    <ChainProvider chain={activeChain!}>
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
            chain={activeChain!}
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <TokenIcon
                  width={16}
                  height={16}
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
                />
                <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full bg-white p-0.5">
                  <ChainProvider chain={activeChain!}>
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
  );
};

export default TokensSelect;
