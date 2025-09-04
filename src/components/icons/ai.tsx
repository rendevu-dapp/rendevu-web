// types
import { IconProps } from "@/common/types/icon";

export const SparklesIcon = ({
  fill = "#F8F9FA",
  size,
  height,
  width,
  ...props
}: IconProps) => {
  const finalWidth = width || size || 34;
  const finalHeight = height || size || 34;

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.25 12.7499L15.5834 10.6249L21.25 8.49777L23.375 2.83325L25.502 8.49777L31.1667 10.6249L25.502 12.7499L23.375 18.4165L21.25 12.7499ZM9.91666 24.0833L2.83337 21.2499L9.91666 18.4165L12.75 11.3333L15.5834 18.4165L22.6667 21.2499L15.5834 24.0833L12.75 31.1665L9.91666 24.0833Z"
        fill={fill}
      />
    </svg>
  );
};
