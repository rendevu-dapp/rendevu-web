// imports
import { IconProps } from "@/common/types/icon";

export const PlusAddIcon = ({
  fill = "#F8F9FA",
  size,
  height,
  width,
  ...props
}: IconProps) => {
  const finalWidth = width || size || 18;
  const finalHeight = height || size || 18;

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.25 9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75H9.75V14.25H8.25V9.75Z"
        fill={fill}
      />
    </svg>
  );
};
