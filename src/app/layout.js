import { EB_Garamond } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({ subsets: ["latin"] });

export const metadata = {
  title: "entirely different matters",
  description: "entirely different matters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={garamond.className}>{children}</body>
    </html>
  );
}
