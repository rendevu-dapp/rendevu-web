// react

import { TrashIcon, UploadIcon } from "@phosphor-icons/react";
import { FC, useLayoutEffect, useMemo, useRef } from "react";
// imports
import { useFormContext } from "react-hook-form";
// helpers
import { classnames } from "@/common/helpers";
// schemas
import { EditEventValues } from "@/common/schemas/edit-event.schema";
// shared components
import { FileDropzone } from "@/components/shared";

// types
type EventImageProps = {
  initialImage: string;
};

const EventImage: FC<EventImageProps> = ({ initialImage }) => {
  // ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  // hooks
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EditEventValues>();

  // derived state
  const uploadedFile = watch("details.image");
  const isFileSelected = uploadedFile instanceof File;
  const imageUrl = useMemo(() => {
    if (isFileSelected) {
      return URL.createObjectURL(uploadedFile);
    }
    return typeof uploadedFile === "string" ? uploadedFile : initialImage;
  }, [isFileSelected, initialImage, uploadedFile]);

  // handlers
  const handleFileSelect = (files: FileList | null) => {
    if (!files || !files.length) return;

    const newFiles = Array.from(files);
    const file = newFiles[0];
    setValue("details.image", file, { shouldValidate: true });
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = () => {
    setValue("details.image", initialImage, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // effects
  useLayoutEffect(() => {
    return () => {
      if (imageUrl && isFileSelected) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, isFileSelected]);

  return (
    <div className="flex w-full flex-col gap-2">
      <FileDropzone
        fileInputRef={fileInputRef}
        handleBoxClick={handleBoxClick}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleFileSelect={handleFileSelect}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "transparent",
        }}
        className={classnames(
          "relative grid h-56 w-full grid-rows-12 rounded-2xl border border-[#E9ECEF] bg-[#F8F9FA] p-5",
          {
            "!cursor-pointer": true,
            "!bg-danger-50 hover:!bg-danger-100 !border-danger": Boolean(
              errors.details?.image,
            ),
          },
        )}
      >
        <div className="row-span-2 flex items-start justify-end">
          {isFileSelected ? (
            <div className="bg-destructive-100 flex h-7 w-7 items-center justify-center rounded-full border border-red-300 p-1">
              <TrashIcon
                weight="duotone"
                size={16}
                className="text-destructive-500 h-4 w-4"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
              />
            </div>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#868E96] bg-[#E9ECEF] dark:bg-gray-700 p-1.5">
              <UploadIcon weight="fill" size={16} className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="row-span-10 flex w-full flex-col items-center justify-center"></div>
      </FileDropzone>
    </div>
  );
};

export default EventImage;
