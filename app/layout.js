import { Montserrat } from "next/font/google";
import "./globals.css";

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
    </html>
  );
}
