import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClauseGuard - AI Contract Red-Flag Scanner",
  description:
    "Paste any contract, lease, or NDA and get an instant AI-powered breakdown of risky clauses in plain English.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
