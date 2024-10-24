import type { Metadata } from "next";
import { Workbench } from 'next/font/google';
import "./globals.css";
import MdNavBar from "../components/MdNavBar";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from './loading';
import BottomMore from "@/components/BottomMore";
import Providers from "./providers";
import { headers } from "next/headers";

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

const DynamicBackgroundVideo = dynamic(() => import('@/components/BackgroundVideo'), {
  ssr: false,
  loading: () =>  <div className="absolute inset-0 flex items-center justify-center bg-black text-[#F7F2DA]">
  <img src='/images/main.PNG' alt='loading' className='h-[100vh] w-[100vw]' />
    </div>
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get("cookie");
  return (
    <html lang="en">
      <body className={`${workbench.variable} dark text-[#F7F2DA] antialiased font-workbench`}>
        <Providers  cookie={cookie}>
          <div className="min-h-screen">
            <DynamicBackgroundVideo />
            <div className="">
              <MdNavBar />
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
              <DynamicBackgroundVideo />
              <BottomMore />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}