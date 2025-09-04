import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@heroui/react";
import { X } from "@phosphor-icons/react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  ChainIcon,
  ChainProvider,
  TokenIcon,
  TokenProvider,
} from "thirdweb/react";
import { thirdwebClient } from "@/common/configs";
import { supportedTokens } from "@/common/data";
import { CreateEventValues } from "@/common/schemas/create-event.schema";

interface NumberInputProps {
  id: string;
  token: (typeof supportedTokens)[number][number];
  value: string;
  onChange: (value: number) => void;
  onRemove?: () => void;
}

export const NumberInput: FC<NumberInputProps> = ({
  id,
  value,
  token,
  onChange,
  onRemove,
}) => {
  const { watch } = useFormContext<CreateEventValues>();
  const selectedChain = watch("chain");

  return (
    <Card className="border border-[#E9ECEF] dark:border-[#343A40] px-2 py-1 shadow-none">
      <CardHeader className="flex items-center justify-between pb-1.5">
        <span className="text-xs font-semibold text-[#868E96] dark:text-gray-300">
          {token.symbol} on {selectedChain.name}
        </span>
        {onRemove && (
          <Button
            isIconOnly
            size="sm"
            onPress={onRemove}
            variant="bordered"
            className="h-5 w-5 min-w-5 rounded-full border-[0.5px] border-[#868E96] text-[#868E96]"
          >
            <X weight="bold" width={8} height={8} alt="Remove" color="gray" />
          </Button>
        )}
      </CardHeader>
      <CardBody className="flex items-start justify-start pt-1.5">
        <TokenProvider
          address={token.address}
          client={thirdwebClient}
          chain={selectedChain}
        >
          <div className="flex w-full items-center gap-2.5">
            <div className="relative">
              <TokenIcon
                width={52}
                height={52}
                loading="lazy"
                loadingComponent={
                  <Avatar
                    src={token.icon}
                    alt={token.symbol}
                    size="sm"
                    className="h-[52px] w-[52px] bg-[#f2f4f7]"
                  />
                }
                fallbackComponent={
                  <Avatar
                    src={token.icon}
                    alt={token.symbol}
                    size="sm"
                    className="h-[52px] w-[52px] bg-[#f2f4f7]"
                  />
                }
              />
              <span className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full bg-white p-0.5">
                <ChainProvider chain={selectedChain}>
                  <ChainIcon client={thirdwebClient} />
                </ChainProvider>
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1">
              <Input
                id={id}
                size="sm"
                type="number"
                placeholder="0.00"
                min={0}
                step={0.01}
                defaultValue={String(value)}
                onValueChange={(val) => onChange(Number(val))}
                classNames={{
                  base: "w-full",
                  inputWrapper:
                    "!bg-white px-0 shadow-none dark:!bg-transparent",
                  input:
                    "text-xl leading-none font-bold text-black dark:!bg-transparent",
                }}
              />
              <span className="text-[12px] leading-none font-medium text-[#6B1ACF]">
                $ {!isNaN(Number(value)) ? Number(value) * 3000 : "0.00"}
              </span>
            </div>
          </div>
        </TokenProvider>
      </CardBody>
    </Card>
  );
};
