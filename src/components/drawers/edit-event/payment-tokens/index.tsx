// react
import { useCallback, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
// imports
import { baseSepolia } from "thirdweb/chains";
import { useActiveWalletChain } from "thirdweb/react";
// data
import { defaultNativeToken, supportedTokens } from "@/common/data";
// helpers
import { compareAddress, normalizeAddress } from "@/common/helpers";
// schemas
import { EditEventValues } from "@/common/schemas/edit-event.schema";
// components
import TokenInput from "./token-input";
import TokensSelect from "./token-selection";

const PaymentTokens = () => {
  // state
  const [selectOpen, setSelectOpen] = useState(false);

  // hooks
  const activeChain = useActiveWalletChain() || baseSepolia;
  const { control } = useFormContext<EditEventValues>();
  const { fields, update, remove, replace } = useFieldArray({
    control,
    name: "ticketing",
  });

  // derived data
  const networkSelectedTokens = useMemo(
    () =>
      activeChain
        ? [defaultNativeToken, ...(supportedTokens[activeChain.id] || [])]
        : [],
    [activeChain],
  );

  const ticketingTokensWithPrice = useMemo(() => {
    return (fields || []).map((field) => {
      const token = networkSelectedTokens.find((t) =>
        compareAddress(t.address, field.token),
      );
      return {
        ...field,
        ...(token || {}),
        price: field.price !== undefined ? field.price : 0,
        address: normalizeAddress(token?.address || field.token),
        tokenAddress: normalizeAddress(field.token),
        decimals: token?.decimals || 18,
      };
    });
  }, [fields, networkSelectedTokens]);

  // handlers
  const handleTokenSelection = useCallback(
    (keys: Set<string>) => {
      const newFields = [...keys]
        .map((key) => {
          const token = networkSelectedTokens.find((t) =>
            compareAddress(t.address, key),
          );
          if (!token || !token.address) return null;

          const existingField = fields.find((f) =>
            compareAddress(f.token, token.address),
          );

          return {
            token: token.address,
            price: existingField?.price ?? 0,
            decimals: token.decimals,
          };
        })
        .filter(
          (
            f,
          ): f is {
            id: string;
            price: number;
            token: string;
            decimals: number;
          } => f !== null,
        );

      replace(newFields);
      setSelectOpen(false);
    },
    [networkSelectedTokens, fields, replace],
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <h4 className="text-xl font-bold">Payment Tokens</h4>
      {/* tokens dropdown */}
      <TokensSelect
        fields={fields}
        selectOpen={selectOpen}
        networkSelectedTokens={networkSelectedTokens}
        setSelectOpen={setSelectOpen}
        handleTokenSelection={handleTokenSelection}
      />
      {/* selected tokens inputs */}
      <div className="space-y-2">
        {ticketingTokensWithPrice.map((token, index) => {
          const formattedValue =
            token.price !== undefined && token.price !== null
              ? token.price.toString()
              : "0";

          return (
            <TokenInput
              key={token.tokenAddress}
              id={`price-${token.tokenAddress}`}
              token={{
                address: token.tokenAddress,
                name: token.name || "",
                symbol: token.symbol || "",
                decimals: token.decimals || 18,
                icon: token.icon!,
              }}
              value={formattedValue}
              onChange={(value) =>
                update(index, {
                  token: token.tokenAddress,
                  decimals: token.decimals,
                  price: value,
                })
              }
              onRemove={() => {
                remove(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PaymentTokens;
