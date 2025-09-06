"use client";

// imports
import {
  Avatar,
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkSimpleIcon } from "@phosphor-icons/react";
// next
import Link from "next/link";
import { FC, Fragment, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  getContract,
  NATIVE_TOKEN_ADDRESS,
  PreparedTransaction,
  prepareContractCall,
  toTokens,
  ZERO_ADDRESS,
} from "thirdweb";
import { base } from "thirdweb/chains";
import { approve, balanceOf } from "thirdweb/extensions/erc20";
import {
  ChainIcon,
  ChainProvider,
  TokenIcon,
  TokenProvider,
  useActiveAccount,
  useSendAndConfirmTransaction,
} from "thirdweb/react";
import { useMediaQuery } from "usehooks-ts";
import { TransactionReceipt } from "viem";
// abis
import { eventPlatformAbi } from "@/common/abis/event-platform.abi";
// config
import { thirdwebClient } from "@/common/configs";
// constants
import { eventPlatformContractAddress } from "@/common/constants";
// data
import { defaultNativeToken, supportedTokens } from "@/common/data";
// helpers
import { compareAddress } from "@/common/helpers";
// schemas
import {
  EventRegistrationValues,
  eventRegistrationSchema,
} from "@/common/schemas/event-registration.schema";
// types
import { PaymentToken } from "@/components/features/single-event/event-details/type";

type EventRegistrationProps = {
  isOpen: boolean;
  details: {
    eventId: string;
    isPaid: boolean;
    email: string;
    name: string;
    paymentTokens: PaymentToken[];
  };
  onOpenChange: (isOpen: boolean) => void;
  onRefetchEvent: () => void;
};

export const EventRegistrationModal: FC<EventRegistrationProps> = ({
  isOpen,
  details,
  onOpenChange,
  onRefetchEvent,
}) => {
  // hooks
  const activeChain = base;
  const account = useActiveAccount();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutateAsync: sendAndConfirmTx } = useSendAndConfirmTransaction();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EventRegistrationValues>({
    resolver: zodResolver(eventRegistrationSchema),
    mode: "all",
    defaultValues: {
      eventId: details.eventId,
      isPaid: details.isPaid,
      email: details.email,
      name: details.name,
    },
  });

  // derived data
  const networkSelectedTokens = useMemo(() => {
    if (!activeChain) return [];
    return [defaultNativeToken, ...(supportedTokens[activeChain.id] || [])];
  }, [activeChain]);
  const eventPaymentTokens = useMemo(() => {
    if (!details.paymentTokens.length) return [];
    return details.paymentTokens.map((token) => {
      const networkToken = networkSelectedTokens.find((t) =>
        compareAddress(t.address, token.tokenAddress),
      );
      return {
        ...token,
        name: networkToken?.name || "Unknown Token",
        symbol: networkToken?.symbol || "UNK",
        decimals: networkToken?.decimals || 18,
        icon: networkToken?.icon || "",
      };
    });
  }, [details.paymentTokens, networkSelectedTokens]);

  // handlers
  const handleRegisterFreeEvent = async (data: EventRegistrationValues) => {
    // handle free event registration logic
    if (!data.eventId || data.isPaid) {
      throw new Error("Invalid event registration data");
    }

    const contract = getContract({
      client: thirdwebClient,
      chain: base,
      abi: eventPlatformAbi,
      address: eventPlatformContractAddress,
    });

    const preparedTx = prepareContractCall({
      contract,
      method: "register",
      params: [BigInt(details.eventId), ZERO_ADDRESS],
    }) as PreparedTransaction;

    return sendAndConfirmTx(preparedTx);
  };

  const handleRegisterPaidEvent = async (data: EventRegistrationValues) => {
    // handle paid event registration logic
    if (!data.eventId || !data.isPaid) {
      throw new Error("Invalid event registration data");
    }

    if (!data.payment) {
      throw new Error("Payment details are required for paid events");
    }

    if (!account) {
      throw new Error(
        "You need to connect your wallet to register for a paid event.",
      );
    }

    const contract = getContract({
      client: thirdwebClient,
      chain: base,
      abi: eventPlatformAbi,
      address: eventPlatformContractAddress,
    });

    const isNativeTokenPayment = compareAddress(
      data.payment.token,
      NATIVE_TOKEN_ADDRESS,
    );

    // if is erc20 token payment, we need to approve the contract to spend tokens
    if (!isNativeTokenPayment) {
      const erc20Contract = getContract({
        client: thirdwebClient,
        chain: base,
        address: data.payment.token,
      });

      // first lets check if the user has enough balance
      const balance = await balanceOf({
        contract: erc20Contract,
        address: account.address,
      });

      if (balance < BigInt(data.payment.price)) {
        throw new Error("Insufficient token balance for registration");
      }

      // then we need to approve the contract to spend the tokens
      const approvalTx = approve({
        contract: erc20Contract,
        spender: eventPlatformContractAddress,
        amount: data.payment.price.toString(),
      });

      await sendAndConfirmTx(approvalTx);
    }

    const preparedTx = prepareContractCall({
      contract,
      method: "register",
      params: [BigInt(data.eventId), data.payment.token],
      value: isNativeTokenPayment ? BigInt(data.payment.price) : undefined,
    }) as PreparedTransaction;

    return sendAndConfirmTx(preparedTx);
  };

  const onSubmit: SubmitHandler<EventRegistrationValues> = async (data, e) => {
    e?.preventDefault();

    if (!account) {
      addToast({
        title: "Please connect your wallet",
        description:
          "You need to connect your wallet to register for an event.",
        color: "danger",
      });
      return;
    }

    let txReceipt: TransactionReceipt;
    try {
      if (!data.isPaid) {
        txReceipt = await handleRegisterFreeEvent(data);
      } else {
        txReceipt = await handleRegisterPaidEvent(data);
      }

      // close modal
      onOpenChange(false);
      // refetch event details
      onRefetchEvent();

      addToast({
        title: "Registration successful",
        description: (
          <div className="flex flex-col gap-1">
            <span>You have successfully registered for the event!</span>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`https://basescan.org/tx/${txReceipt.transactionHash}`}
              className="text-secondary text-sm font-medium inline-flex items-center gap-1"
            >
              <span>View Transaction</span>
              <LinkSimpleIcon size={16} className="text-secondary" />
            </Link>
          </div>
        ),
        color: "success",
      });

      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        addToast({
          title: `Registration failed: ${error.message}`,
          color: "danger",
        });
        return;
      }
      addToast({
        title: `Something went wrong`,
        color: "danger",
      });
    }
  };

  const triggerSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      hideCloseButton
      isDismissable={false}
      isKeyboardDismissDisabled
      onOpenChange={onOpenChange}
      placement={isMobile ? "bottom" : "center"}
      className="dark:border dark:border-[#343A40]"
    >
      <ModalContent className="max-w-lg">
        {(onClose) => (
          <Fragment>
            <ModalHeader className="flex flex-col gap-1">
              <h5 className="text-xl font-bold text-neutral-900 dark:text-gray-200">
                Register For Event
              </h5>
              <p className="text-sm font-medium text-placeholder">
                Register for the event to secure your spot!
              </p>
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="pb-2 flex flex-col gap-6"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register("name")}
                    isInvalid={!!errors.name?.message}
                    errorMessage={errors.name?.message}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    placeholder="email@example.com"
                    type="email"
                    {...register("email")}
                    isInvalid={!!errors.email?.message}
                    errorMessage={errors.email?.message}
                  />
                </div>

                {details.isPaid && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="payment" className="text-sm font-medium">
                      Payment Method
                    </label>
                    <Select
                      id="payment"
                      aria-label="Select Payment Tokens"
                      size={"md"}
                      items={eventPaymentTokens}
                      variant="bordered"
                      placeholder="Select a payment token"
                      isInvalid={!!errors.payment?.message}
                      errorMessage={errors.payment?.message}
                      onSelectionChange={(keys) => {
                        // get first selected key from Set
                        const selectedKey = Array.from(keys)[0];
                        if (selectedKey) {
                          const selectedToken = eventPaymentTokens.find(
                            (token) => token.tokenAddress === selectedKey,
                          );

                          if (!selectedToken) return;
                          setValue("payment", {
                            price: selectedToken.price,
                            token: selectedToken.tokenAddress,
                          });
                        }
                      }}
                      renderValue={(items) => {
                        return (
                          <div className="flex flex-wrap gap-2">
                            {items.map((item) => (
                              <TokenProvider
                                key={item.key}
                                chain={base}
                                client={thirdwebClient}
                                address={item.data?.tokenAddress}
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
                                    />
                                    <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full bg-white p-0.5">
                                      <ChainProvider chain={activeChain!}>
                                        <ChainIcon client={thirdwebClient} />
                                      </ChainProvider>
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    <span className="text-lg font-semibold text-black">
                                      {toTokens(
                                        item.data?.price,
                                        item.data?.decimals || 18,
                                      )}
                                    </span>
                                    <span className="text-xs font-semibold text-[#868E96]">
                                      {item.data?.symbol}
                                    </span>
                                  </div>
                                </div>
                              </TokenProvider>
                            ))}
                          </div>
                        );
                      }}
                      classNames={{
                        base: "w-full",
                        trigger:
                          "min-h-14 py-5 px-4 border rounded-3xl shadow-none",
                      }}
                    >
                      {(paymentToken) => (
                        <SelectItem
                          key={paymentToken.tokenAddress}
                          textValue={`${paymentToken.tokenAddress} - ${paymentToken.price}`}
                        >
                          <TokenProvider
                            key={paymentToken.tokenAddress}
                            chain={base}
                            client={thirdwebClient}
                            address={paymentToken.tokenAddress}
                          >
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <TokenIcon
                                  width={28}
                                  height={28}
                                  loading="lazy"
                                  loadingComponent={
                                    <Avatar
                                      src={paymentToken.icon}
                                      alt={paymentToken.symbol}
                                      size="sm"
                                      className="h-7 w-7 bg-[#f2f4f7]"
                                    />
                                  }
                                  fallbackComponent={
                                    <Avatar
                                      src={paymentToken.icon}
                                      alt={paymentToken.symbol}
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
                              <div className="flex gap-2">
                                <span className="text-lg font-semibold text-black">
                                  {toTokens(
                                    paymentToken.price,
                                    paymentToken.decimals || 18,
                                  )}
                                </span>
                                <span className="text-xs font-semibold text-[#868E96]">
                                  {paymentToken.symbol}
                                </span>
                              </div>
                            </div>
                          </TokenProvider>
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                )}
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                disabled={isSubmitting}
                onPress={onClose}
                className="w-full font-semibold rounded-full"
              >
                Cancel
              </Button>
              <Button
                color="secondary"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                onPress={triggerSubmit}
                className="w-full font-semibold rounded-full"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  );
};
