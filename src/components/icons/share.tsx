// types
import { IconProps } from "@/common/types/icon";

export const ShareForwardIcon = ({
  fill = "#868E96",
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
        d="M15.75 9L10.5 3.75V6.75C5.25 7.5 3 11.25 2.25 15C4.125 12.375 6.75 11.175 10.5 11.175V14.25L15.75 9Z"
        fill={fill}
      />
    </svg>
  );
};
