import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Registration Form",
  description: "A full-stack Next.js user registration form with form validation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
