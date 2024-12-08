"use client";

import { useState, useEffect, Suspense } from "react";
import { HeroSection } from "../components/Hero";
import { WalletPopup } from "@/components/Introduction";
import Loading from "./loading";
import Footer from "@/components/Footer";
import ComponentCoin from "@/components/CoinComponent";
import ImageComponent from "@/components/ImageList";
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import CollectionsGrid from "@/components/popular";
import StatisticsComponent from "@/components/statistics";
import CryptoDisplay from "@/components/CryptoDisplay";
import SuppotersComponent from "@/components/supporters";
import ImageContent1 from "@/components/Testimonial";
import { BatchHero } from "@/components/BatchHero";

const Content = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [isConnected]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='align-middle flex flex-col'>
      <BatchHero />
      <ComponentCoin />
      <Footer />
      {showPopup && (
        <WalletPopup onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#787878',
            accentColorForeground: '#F7F2DA',
            borderRadius: 'none',
           
          })}
        >
          <Content />
        </RainbowKitProvider>
    </Suspense>
  );
}