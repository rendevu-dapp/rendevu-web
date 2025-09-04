// layout
import { AppAuthLayout } from "@/components/layout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppAuthLayout>{children}</AppAuthLayout>;
}
