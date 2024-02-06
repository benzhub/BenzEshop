import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "electechpro.com",
  description: "Discover cutting-edge solutions for your electrical and technology needs at ElectechPro.com. From expert installations to innovative repairs, our skilled technicians deliver top-quality service tailored to your requirements. Explore our range of services today!",
  openGraph: {
    title: '...',
    description: '...'
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="emerald">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
