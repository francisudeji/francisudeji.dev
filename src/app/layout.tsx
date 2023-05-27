import Link from "next/link";
import { Container } from "src/components/container";
import { Inter } from "@next/font/google";

import "./globals.css";

const navigation = [
  { name: "blog", path: "/blog" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
];

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body style={inter.style}>
        <nav className="h-14 flex items-center border-b border-b-slate-200 sticky bg-slate-100/70 top-0 backdrop-blur-md text-slate-700">
          <Container variant="large">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-semibold">
                Francis Udeji
              </Link>
              <ul className="flex items-center space-x-5">
                {navigation.map((nav) => (
                  <li key={nav.name}>
                    <Link href={nav.path} className="text-sm font-normal">
                      {nav.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
