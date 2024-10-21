"use client";

import { useState, useEffect, Suspense } from "react";
import { HeroSection } from "../components/Hero";
import { WalletPopup } from "@/components/Introduction";
import {
  ThirdwebProvider,
  ConnectWallet,
  darkTheme,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import Loading from "./loading";
import Footer from "@/components/Footer";
import ComponentCoin from "@/components/CoinComponent";

const Content = () => {
  const [showPopup, setShowPopup] = useState(false);
  const connectionStatus = useConnectionStatus();

  useEffect(() => {
    if (connectionStatus !== "connected") {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [connectionStatus]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='align-middle flex flex-col'>
      <HeroSection />
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
      <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
        <Content />
      </ThirdwebProvider>
    </Suspense>
  );
}