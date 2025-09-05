// types
import { IconProps } from "@/common/types/icon";

export const ChevronDownIcon = ({
  size,
  height,
  width,
  className,
  ...props
}: IconProps) => {
  const finalWidth = width || size || 32;
  const finalHeight = height || size || 32;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={finalWidth}
      height={finalHeight}
      className={className}
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        d="M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ChevronRightIcon = ({
  size,
  height,
  width,
  className,
  ...props
}: IconProps) => {
  const finalWidth = width || size || 16;
  const finalHeight = height || size || 16;

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M6.07308 4.67632L8.91069 7.52013L6.07308 10.3639L6.94667 11.2375L10.6641 7.52013L6.94667 3.80273L6.07308 4.67632Z"
        fill="currentColor"
      />
    </svg>
  );
};
