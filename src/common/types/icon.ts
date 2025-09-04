// react
import { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  size?: number;
  height?: number;
  width?: number;
  variant?: "filled" | "outlined" | "duotone";
};
