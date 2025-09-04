import { DrawerBody } from "@heroui/react";
import { FC } from "react";
import { supportedTokens } from "@/common/data";
import { CreateEventValues } from "@/common/schemas/create-event.schema";
import { NumberInput } from "./payment-number-input";

type PaymentTicketBodyProps = {
  fields: NonNullable<CreateEventValues["ticketing"]> | undefined;
  netWorkSelectedTokens: (typeof supportedTokens)[number][number][];
  selectedChain: CreateEventValues["chain"];
  onUpdate: (
    index: number,
    value: NonNullable<CreateEventValues["ticketing"]>[number],
  ) => void;
  onRemove: (index: number) => void;
};

export const PaymentTicketBody: FC<PaymentTicketBodyProps> = ({
  fields,
  netWorkSelectedTokens,
  onUpdate,
  onRemove,
}) => (
  <DrawerBody>
    {(fields ?? []).map((field, index) => {
      const token = netWorkSelectedTokens.find(
        (t) => t.address === field.token,
      )!;
      const formattedValue =
        field.price !== undefined && field.price !== null
          ? field.price.toString()
          : "";

      return (
        <NumberInput
          key={field.token}
          id={`price-${field.token}`}
          token={token}
          value={formattedValue}
          onChange={(value) =>
            onUpdate(index, {
              token: field.token,
              price: value,
              decimals: field.decimals,
            })
          }
          onRemove={() => onRemove(index)}
        />
      );
    })}
  </DrawerBody>
);
