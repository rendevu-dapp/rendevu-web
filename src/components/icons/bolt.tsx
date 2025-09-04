// types
import { IconProps } from "@/common/types/icon";

export const BoltIcon = ({
  fill = "#DBC144",
  size,
  height,
  width,
  ...props
}: IconProps) => {
  const finalWidth = width || size || 24;
  const finalHeight = height || size || 24;

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.0452 13.6815L3.59399 20.406L10.3185 13.6815L6.95624 10.3185L20.406 3.59399L13.6815 10.3185L17.0452 13.6815Z"
        fill={fill}
      />
    </svg>
  );
};
