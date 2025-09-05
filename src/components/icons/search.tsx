// types
import { IconProps } from "@/common/types/icon";

export const SearchIcon = ({
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 2,
  size,
  height,
  width,
  ...props
}: IconProps) => {
  const finalWidth = width || size || 24;
  const finalHeight = height || size || 24;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m21 21-4.34-4.34" />
      <circle cx="11" cy="11" r="8" />
    </svg>
  );
};
