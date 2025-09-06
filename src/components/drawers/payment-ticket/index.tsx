"use client";

import { Button, Drawer, DrawerContent, DrawerFooter } from "@heroui/react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";
import { defaultNativeToken, supportedTokens } from "@/common/data";
import { compareAddress } from "@/common/helpers";
import { CreateEventValues } from "@/common/schemas/create-event.schema";
import { PaymentTicketBody } from "./payment-ticket-body";
import { PaymentTicketHeader } from "./payment-ticket-header";

interface PaymentTicketProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const PaymentTicketDrawer: FC<PaymentTicketProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { control, watch } = useFormContext<CreateEventValues>();
  const { fields, update, replace, remove } = useFieldArray({
    control,
    name: "ticketing",
  });

  const selectedChain = watch("chain");
  let netWorkSelectedTokens = selectedChain
    ? [defaultNativeToken, ...(supportedTokens[selectedChain?.id] || [])]
    : [];

  const handleTokenSelection = useCallback(
    (keys: Set<string>) => {
      const newFields = [...keys]
        .map((key) => {
          const token = netWorkSelectedTokens.find((t) =>
            compareAddress(t.address, key),
          );
          if (!token || !token.address) return null;

          const existingField = fields.find((f) =>
            compareAddress(f.token, token.address),
          );
          const price = existingField ? existingField.price : 0;

          return { token: token.address, price, decimals: token.decimals };
        })
        .filter(
          (f): f is { token: string; price: number; decimals: number } =>
            f !== null,
        );

      replace(newFields);
      setSelectOpen(false);
    },
    [netWorkSelectedTokens, fields, replace],
  );

  const handleSave = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const drawerClassNames = useMemo(
    () => ({
      base: isMobile
        ? "m-0 w-full h-full max-w-full max-h-full rounded-none"
        : "data-[placement=right]:md:m-2 data-[placement=left]:md:m-2 rounded-medium",
    }),
    [isMobile],
  );

  useEffect(() => {
    netWorkSelectedTokens = [
      defaultNativeToken,
      ...(supportedTokens[selectedChain?.id] || []),
    ];
  }, [watch("chain")]);

  return (
    <Drawer
      placement={isMobile ? "bottom" : "right"}
      hideCloseButton
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={drawerClassNames}
    >
      <DrawerContent className="no-scrollbar">
        {(onClose) => (
          <>
            <PaymentTicketHeader
              onClose={onClose}
              selectOpen={selectOpen}
              setSelectOpen={setSelectOpen}
              netWorkSelectedTokens={netWorkSelectedTokens}
              fields={fields}
              selectedChain={selectedChain}
              onTokenSelection={handleTokenSelection}
            />
            <PaymentTicketBody
              fields={fields}
              netWorkSelectedTokens={netWorkSelectedTokens}
              selectedChain={selectedChain}
              onUpdate={update}
              onRemove={remove}
            />
            <DrawerFooter className="border-default-200/50 flex flex-col gap-3 border-t p-4">
              <Button
                color="primary"
                onPress={handleSave}
                className="w-full rounded-full bg-[#6B1ACF] p-6 text-white"
              >
                Create Ticket
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
