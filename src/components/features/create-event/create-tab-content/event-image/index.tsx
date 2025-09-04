// react

import { TrashIcon, UploadIcon } from "@phosphor-icons/react";
import { Fragment, useLayoutEffect, useMemo, useRef } from "react";
// imports
import { useFormContext } from "react-hook-form";
// helpers
import { classnames } from "@/common/helpers";
// schemas
import { CreateEventValues } from "@/common/schemas/create-event.schema";
import { FileDropzone } from "@/components/shared";
// components
import { HostCard } from "./host-card";

export const EventImage = () => {
  // ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  // hooks
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateEventValues>();

  // derived state
  const uploadedFile = watch("details.image");
  const isFileSelected = Boolean(uploadedFile);
  const imageUrl = useMemo(() => {
    if (uploadedFile) {
      return URL.createObjectURL(uploadedFile);
    }
    return undefined;
  }, [uploadedFile]);

  // handlers
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

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
    setValue("details.image", undefined, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // effects
  useLayoutEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="flex w-full flex-col gap-2">
      {/* image dropzone */}
      <FileDropzone
        fileInputRef={fileInputRef}
        handleBoxClick={handleBoxClick}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleFileSelect={handleFileSelect}
        disabled={isFileSelected}
        style={
          uploadedFile
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "transparent",
              }
            : undefined
        }
        className={classnames(
          "relative grid h-48 w-full grid-rows-12 rounded-2xl border border-[#E9ECEF] dark:border-[#343A40] bg-[#F8F9FA] dark:bg-[#181A1B] p-5",
          {
            "!cursor-auto": isFileSelected,
            "!bg-danger-50 hover:!bg-danger-100 !border-danger": Boolean(
              errors.details?.image,
            ),
          },
        )}
      >
        <div className="row-span-2 flex items-start justify-end">
          {!isFileSelected ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#868E96] dark:border-[#343A40] bg-[#E9ECEF] dark:bg-[#181A1B] p-1.5">
              <UploadIcon weight="fill" size={16} className="h-4 w-4" />
            </div>
          ) : (
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
          )}
        </div>
        <div className="row-span-10 flex w-full flex-col items-center justify-center">
          {!isFileSelected && (
            <Fragment>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-400">
                Upload event image
              </p>
              <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-400">
                Drag and drop or{" "}
                <label
                  htmlFor="fileUpload"
                  className="text-primary hover:text-primary/90 cursor-pointer font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  choose file
                </label>{" "}
                (4MB max)
              </p>
            </Fragment>
          )}
        </div>
      </FileDropzone>
      {/* image errors */}
      {errors.details?.image && (
        <p className="text-tiny text-danger">{errors.details.image.message}</p>
      )}
      {/* host card */}
      <HostCard />
    </div>
  );
};
