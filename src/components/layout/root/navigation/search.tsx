// imports
import { Input, NavbarContent } from "@heroui/react";

// components
import { SearchIcon } from "@/components/icons";

const SearchInput = () => {
  return (
    <NavbarContent as="div" className="items-center" justify="end">
      <Input
        isClearable={false}
        classNames={{
          base: "max-w-full sm:max-w-[530px] w-full !bg-surfaces-bg-secondary h-10",
          mainWrapper: "h-full",
          input: "px-4 text-small font-semibold placeholder:text-placeholder",
          inputWrapper:
            "h-full !bg-surfaces-bg-secondary font-normal text-default-500 shadow-none",
        }}
        placeholder="Search"
        size="lg"
        endContent={
          <div className="pr-2 flex items-center justify-center h-full">
            <SearchIcon size={18} color={"#868E96"} />
          </div>
        }
        type="search"
      />
    </NavbarContent>
  );
};

export default SearchInput;