
import type { Metadata } from "next";
import { Workbench } from 'next/font/google';
import "./globals.css";
import  MdNavBar from "../components/MdNavBar";
import { Providers } from "./providers";
import { Suspense } from 'react';
import Loading from './loading';
import BottomMore from "@/components/BottomMore";
import BackgroundVideo from "@/components/VideoBackground";

const workbench = Workbench({
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-workbench',
});

export const metadata: Metadata = {
  title: "OmniPump",
  description: "Generate and create your own coin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className={`${workbench.variable} dark text-[#F7F2DA] antialiased relative font-workbench`}>
       <Providers>
        <div className="relative min-h-screen">
          <BackgroundVideo />
          <div className="relative z-10">
          <MdNavBar  />
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
            <BottomMore />
          </div>
        </div>
        </Providers>
      </body>
    </html>
  );
}