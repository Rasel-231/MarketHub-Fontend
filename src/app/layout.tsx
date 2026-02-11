import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Redux/reduxSetup/Provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarketHub | Your Premium E-commerce Destination",
  description:
    "Experience seamless online shopping with MarketHub. Discover a wide range of premium products, from electronics to fashion, all in one place with secure payments and fast delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${nunitoSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <Providers>{children}
            <ToastContainer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
