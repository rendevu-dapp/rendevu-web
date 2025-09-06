// react

// imports
import {
  addToast,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { format, formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import { FC, Fragment, useMemo, useState } from "react";
import type { Selection, SortDescriptor } from "react-aria-components";
import { toTokens } from "thirdweb";
import { base } from "thirdweb/chains";
import {
  Blobbie,
  ChainIcon,
  ChainProvider,
  TokenIcon,
  TokenProvider,
} from "thirdweb/react";
// configs
import { thirdwebClient } from "@/common/configs";
// helpers
import { normalizeAddress, shortenAddress } from "@/common/helpers";
import { BulkActionType } from "@/common/types/bulk-actions";
// icon components
import { SearchIcon } from "@/components/icons";
// modal components
import { BulkActionsModal } from "@/components/modals";
// untitled-ui
import {
  Table,
  TableCard,
} from "@/components/untitled-ui/application/table/table";
import { Avatar } from "@/components/untitled-ui/base/avatar/avatar";
// types
import { GuestWithProfile } from "../types";

type Table01DividerLineProps = {
  eventId: string;
  isPaidEvent?: boolean;
  guestList: GuestWithProfile[];
};

export const Table01DividerLine: FC<Table01DividerLineProps> = ({
  eventId,
  guestList,
  isPaidEvent = false,
}) => {
  // state
  const [action, setAction] = useState<BulkActionType>();
  const [addresses, setAddresses] = useState<string[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "status",
    direction: "ascending",
  });
  // hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // derived data
  const filteredItems = useMemo(() => {
    if (!searchQuery) return guestList;
    return guestList.filter((item) => {
      const name = item.user?.fullName || "";
      const address = item.address || "";
      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [guestList, searchQuery]);

  const sortedItems = useMemo(() => {
    if (!filteredItems || filteredItems.length === 0) return [];
    return filteredItems.sort((a, b) => {
      const first = a[sortDescriptor.column as keyof GuestWithProfile];
      const second = b[sortDescriptor.column as keyof GuestWithProfile];
      if (
        (typeof first === "number" && typeof second === "number") ||
        (typeof first === "boolean" && typeof second === "boolean")
      ) {
        return sortDescriptor.direction === "descending"
          ? Number(second) - Number(first)
          : Number(first) - Number(second);
      }
      if (typeof first === "string" && typeof second === "string") {
        let cmp = first.localeCompare(second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }
      return 0;
    });
  }, [filteredItems, sortDescriptor]);

  // handlers
  const handleBulkAction = (type: BulkActionType) => {
    let selectedGuestAddresses: string[] = [];
    if (selectedKeys === "all") {
      selectedGuestAddresses = sortedItems.map((item) =>
        normalizeAddress(item.address),
      );
    } else if (selectedKeys instanceof Set) {
      selectedGuestAddresses = Array.from(selectedKeys).map((key) =>
        normalizeAddress(key as string),
      );
    }
    if (selectedGuestAddresses.length === 0) {
      addToast({
        color: "warning",
        title: "No guests selected",
        description: "Please select at least one guest to perform this action.",
      });
      setAction(undefined);
      setAddresses(undefined);
      return;
    }
    setAction(type);
    setAddresses(selectedGuestAddresses);
    onOpen();
  };

  const handleSingleAction = (type: BulkActionType, address: string) => {
    setAction(type);
    setAddresses([normalizeAddress(address)]);
    onOpen();
  };

  return (
    <Fragment>
      <TableCard.Root className="dark:bg-[#181A1B]">
        <TableCard.Header
          title="Guest List"
          badge={
            guestList.length
              ? `${guestList.length} guest${guestList.length === 1 ? "" : "s"}`
              : "No guests"
          }
          contentTrailing={
            <div className="flex items-center gap-2">
              <Input
                size="md"
                variant="bordered"
                classNames={{
                  base: "bg-white dark:bg-[#181A1B]",
                  inputWrapper: "bg-white dark:bg-[#181A1B]",
                  input: "text-sm font-medium text-black dark:text-white",
                }}
                placeholder="Search a guest by name or address"
                value={searchQuery}
                onValueChange={setSearchQuery}
                endContent={<SearchIcon size={18} stroke="gray" />}
              />
              <div className="">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      size="sm"
                      radius="md"
                      isDisabled={Boolean(
                        !selectedKeys ||
                          (selectedKeys instanceof Set &&
                            selectedKeys.size === 0),
                      )}
                      className="bg-black text-white dark:border dark:border-[#343A40]"
                    >
                      Bulk Actions
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="faded" aria-label="Static Actions">
                    <DropdownItem
                      key="approve"
                      onPress={() => handleBulkAction("approve")}
                    >
                      Approve Registration
                    </DropdownItem>
                    <DropdownItem
                      key="decline"
                      onPress={() => handleBulkAction("decline")}
                    >
                      Decline Registration
                    </DropdownItem>
                    <DropdownItem
                      key="check-in"
                      onPress={() => handleBulkAction("check-in")}
                    >
                      CheckIn Guests
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          }
          className="bg-white dark:bg-[#181A1B]"
        />
        <Table
          key={
            selectedKeys === "all"
              ? "all"
              : selectedKeys instanceof Set
                ? selectedKeys.size
                : "none"
          }
          aria-label="Team members"
          selectionMode="multiple"
          selectionBehavior="toggle"
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) => {
            setSelectedKeys(keys);
          }}
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <Table.Header className="dark:bg-[#181A1B]">
            <Table.Head
              id="name"
              label="Name"
              isRowHeader
              allowsSorting
              className="w-full max-w-1/4"
            />
            <Table.Head id="status" label="Status" allowsSorting />
            {isPaidEvent && (
              <Table.Head id="payment" label="Payment" allowsSorting />
            )}
            <Table.Head
              id="registration"
              label="Registration Date"
              allowsSorting
              className="md:hidden xl:table-cell"
            />
            <Table.Head id="actions" className="w-32" />
          </Table.Header>
          <Table.Body items={sortedItems} dependencies={[selectedKeys]}>
            {(item) => {
              const normalizedAddress = normalizeAddress(item.address);
              const isRowSelected =
                selectedKeys === "all" ||
                (selectedKeys instanceof Set &&
                  selectedKeys.has(normalizedAddress));

              return (
                <Table.Row
                  id={normalizedAddress}
                  key={normalizedAddress}
                  className="dark:hover:bg-[#343A40] dark:aria-selected:bg-[#343A40]"
                >
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      {item.user ? (
                        <Avatar
                          src={item.user.avatar}
                          alt={item.user.fullName}
                          size="md"
                        />
                      ) : (
                        <Blobbie
                          size={40}
                          address={item.address}
                          className="rounded-full"
                        />
                      )}
                      <div className="whitespace-nowrap">
                        <p className="text-sm font-medium">
                          {item.user?.fullName || shortenAddress(item.address)}
                        </p>
                        {Boolean(item.user?.username || item.user?.email) && (
                          <p className="text-sm text-[#535862]">
                            {item.user?.username || item.user?.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="dot"
                      color={
                        item.status === "accepted"
                          ? "success"
                          : item.status === "rejected"
                            ? "danger"
                            : "default"
                      }
                      className="capitalize"
                    >
                      {item.status}
                    </Chip>
                  </Table.Cell>
                  {isPaidEvent ? (
                    <Table.Cell className="whitespace-nowrap">
                      {item.payment ? (
                        <TokenProvider
                          address={item.payment.token!.address}
                          client={thirdwebClient}
                          chain={base}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="relative">
                              <TokenIcon
                                width={16}
                                height={16}
                                loading="lazy"
                                loadingComponent={
                                  <Avatar
                                    src={item.payment.token!.icon}
                                    alt={item.payment.token!.symbol}
                                    size="sm"
                                    className="h-7 w-7 bg-[#f2f4f7]"
                                  />
                                }
                                fallbackComponent={
                                  <Avatar
                                    src={item.payment.token!.icon}
                                    alt={item.payment.token!.symbol}
                                    size="sm"
                                    className="h-7 w-7 bg-[#f2f4f7]"
                                  />
                                }
                              />
                              <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full bg-white p-0.5">
                                <ChainProvider chain={base}>
                                  <ChainIcon client={thirdwebClient} />
                                </ChainProvider>
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-black text-sm font-semibold dark:text-gray-300">
                                {toTokens(
                                  BigInt(item.payment.token!.price),
                                  item.payment.token!.decimals,
                                )}
                              </span>
                              <span className="text-xs font-semibold text-[#868E96] dark:text-gray-300">
                                {item.payment.token!.symbol}
                              </span>
                            </div>
                          </div>
                        </TokenProvider>
                      ) : null}
                    </Table.Cell>
                  ) : null}
                  <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">
                    <div className="relative group">
                      <Tooltip
                        content={format(
                          fromUnixTime(Number(item.registeredAt) / 1000),
                          "d MMM, yyyy - HH:mm a",
                        )}
                        placement="top"
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {formatDistanceToNowStrict(
                            fromUnixTime(Number(item.registeredAt) / 1000),
                            { addSuffix: true },
                          )}
                        </span>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {isRowSelected ? (
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            size="sm"
                            radius="md"
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-10 text-white bg-black dark:border dark:border-[#343A40]"
                          >
                            Actions
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Row Actions">
                          <DropdownItem
                            key="approve"
                            onPress={() =>
                              handleSingleAction("approve", item.address)
                            }
                          >
                            Approve Registration
                          </DropdownItem>
                          <DropdownItem
                            key="decline"
                            onPress={() =>
                              handleSingleAction("decline", item.address)
                            }
                          >
                            Decline Registration
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    ) : null}
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table>
      </TableCard.Root>
      {isOpen && (
        <BulkActionsModal
          isOpen={isOpen}
          eventId={eventId}
          onOpenChange={onOpenChange}
          actionType={action!}
          selectedGuestAddresses={addresses}
        />
      )}
    </Fragment>
  );
};
