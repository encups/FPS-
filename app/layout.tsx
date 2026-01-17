import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers'

export const metadata: Metadata = {
  title: "Pay-to-Draft Fantasy Football",
  description: "Fantasy football leagues where you must pay to draft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
