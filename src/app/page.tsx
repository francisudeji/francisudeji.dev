import { Inter } from "@next/font/google";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Francis Udeji",
  description: "francisudeji.dev",
  viewport: "width=device-width, initial-scale=1",
  icons: "/favicon.ico",
};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <div>home</div>;
}
