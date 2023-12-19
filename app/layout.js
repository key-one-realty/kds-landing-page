import { Montserrat } from "next/font/google";
import "./globals.css";

import Script from "next/script";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Keyone Design Solution",
  description:
    "Key One Design Solution offers a full interior design process from rendering, walk-throughs, store tours and project management. Each experience is tailored according to our client's specific needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>

      <Script
        src="https://cdn.respond.io/widget/widget.js?wId=4b313c3b-8694-4b58-b3c3-edfc421773e5"
        id="respondio__growth_tool"
      />
    </html>
  );
}
