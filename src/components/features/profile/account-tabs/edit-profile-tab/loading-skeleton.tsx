import { Skeleton } from "@heroui/react";
import { FC } from "react";

const EditProfileTabLoading: FC = () => {
  return (
    <div className="flex flex-col gap-4 dark:bg-[#181A1B]">
      <div className="flex flex-col gap-[13px]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2.5">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-14 rounded-[12px] border border-[#B5B5B5] dark:border-[#343A40]" />
          </div>
          <div className="flex flex-col gap-2.5">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-14 rounded-[12px] border border-[#B5B5B5] dark:border-[#343A40]" />
          </div>
          <div className="flex flex-col gap-2.5">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-14 rounded-[12px] border border-[#B5B5B5] dark:border-[#343A40]" />
          </div>
        </div>
        <Skeleton className="mr-auto h-[42px] w-20 rounded-[12px]" />
      </div>
    </div>
  );
};

export default EditProfileTabLoading;
