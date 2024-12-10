import { ComponentTree } from "@/components/ComponentTree";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <ComponentTree>{children}</ComponentTree>
      </body>
    </html>
  );
}
