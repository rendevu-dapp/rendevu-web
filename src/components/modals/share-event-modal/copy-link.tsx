// react

// imports
import { addToast } from "@heroui/react";
import { CheckIcon, CopyIcon, LinkIcon } from "@phosphor-icons/react";
import { FC, useState } from "react";

// types
type CopyLinkProps = {
  shareUrl: string;
  className?: string;
};

const CopyLink: FC<CopyLinkProps> = ({ shareUrl, className = "" }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      addToast({
        title: "Copied to clipboard",
        color: "success",
      });
    } catch {
      addToast({
        title: "Copy failed",
        description: "Please try selecting and copying manually",
        color: "danger",
      });
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main container */}
      <div
        className={`flex items-center bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-300
          ${
            isCopied
              ? "border-green-400 dark:border-green-500"
              : "border-gray-200 dark:border-gray-700"
          }`}
      >
        {/* URL display section */}
        <div className="flex-1 px-3 py-3 min-w-0">
          <div className="flex items-center gap-1.5">
            <LinkIcon className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate font-mono bg-gray-50 dark:bg-gray-900 px-1.5 py-0.5 rounded">
              {shareUrl}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-7 bg-gray-200 dark:bg-gray-700"></div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          disabled={isCopied}
          className={`relative px-3 py-3 text-gray-600 dark:text-gray-300 transition-colors duration-200 focus:outline-none
            ${
              isCopied
                ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                : "hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/20"
            }`}
          aria-label={isCopied ? "Link copied!" : "Copy link to clipboard"}
        >
          {/* Copy/Check icon with animation */}
          <div className="relative flex items-center justify-center">
            <CopyIcon
              className={`h-4 w-4 transition-all duration-200 ${
                isCopied ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }`}
            />
            <CheckIcon
              className={`h-4 w-4 absolute inset-0 text-green-600 dark:text-green-400 transition-all duration-200 ${
                isCopied ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default CopyLink;
