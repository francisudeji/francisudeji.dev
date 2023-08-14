import Link from "next/link";
import { Inter } from "@next/font/google";

import "@styles/globals.css";
import { Container } from "@components/container";

const navigation = [
  { name: "blog", path: "/blog" },
  {
    name: "Github",
    path: "https://github.com/francisudeji",
    external: true,
    logo: "/github.svg",
  },
  {
    name: "LinkedIn",
    path: "https://linkedin.com/in/francistudeji",
    external: true,
    logo: "/linkedin.svg",
  },
];

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body style={inter.style}>
        <nav className="h-14 flex items-center border-b border-b-slate-200 sticky top-0 backdrop-blur-md text-[#334155]">
          <Container variant="large">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-semibold">
                Francis Udeji
              </Link>
              <ul className="flex items-center space-x-4 sm:space-x-5 md:space-x-6">
                {navigation.map((nav) => {
                  const className = "text-xs uppercase";
                  return (
                    <li key={nav.name}>
                      {nav.external ? (
                        <a className={className} href={nav.path}>
                          {nav.name}
                        </a>
                      ) : (
                        <Link href={nav.path} className={className}>
                          {nav.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Container>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
