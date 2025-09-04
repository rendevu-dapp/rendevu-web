// react
import React, { RefObject } from "react";

// helpers
import { classnames } from "@/common/helpers";

// types
interface FileDropzoneProps {
  className?: string;
  children?: React.ReactNode;
  fileInputRef: RefObject<HTMLInputElement | null>;
  multiple?: boolean;
  accept?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  handleBoxClick: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (files: FileList | null) => void;
}

export function FileDropzone({
  children,
  className,
  fileInputRef,
  multiple = false,
  accept = "image/*",
  style,
  disabled,
  handleBoxClick,
  handleDragOver,
  handleDrop,
  handleFileSelect,
}: FileDropzoneProps) {
  return (
    <div
      onClick={disabled ? undefined : handleBoxClick}
      onDragOver={disabled ? undefined : handleDragOver}
      onDrop={disabled ? undefined : handleDrop}
      className={classnames("cursor-pointer", className)}
      style={style}
    >
      {children}
      <input
        type="file"
        id="fileUpload"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => handleFileSelect(e.target.files)}
      />
    </div>
  );
}
