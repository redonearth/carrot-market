import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import "./globals.css";

const gothicA1 = Gothic_A1({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Carrot Market",
    default: "Carrot Market",
  },
  description: "동네에서 사고 팔자!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gothicA1.className} bg-neutral-900 text-white max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
