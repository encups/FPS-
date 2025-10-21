import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frame Fables - AI Marketing for Small Businesses",
  description: "Automated AI-powered marketing tools with medieval storytelling charm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
