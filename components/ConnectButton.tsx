"use client"
import React from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("com.trustwallet.app"),
];
const customTheme = darkTheme({
  colors: {
    borderColor: "#333333", // Dark gray for borders
    accentText: "#e0e0e0", // Light gray for accent text
    modalBg: "#121212", // Very dark gray, almost black for background
    primaryButtonBg: "#333333", // Dark gray for buttons
    primaryText: "#e0e0e0", // Light gray for primary text
    secondaryText: "#a0a0a0", // Medium gray for secondary text
  },
});

export default function ConnectWallet() {
  return (
    <>
      {/* Button for larger screens (md and up) */}
      <div className="w-full">
      <ConnectButton
  client={client}
  wallets={wallets}
  theme={customTheme}
  connectButton={{ label: "Connect Wallet", className: "text-[#F7F2DA] w-full" }}
  connectModal={{
    size: "wide",
    title: "OmniPump Coin Wallet",
    showThirdwebBranding: false,
  }}
/>
      </div>
    </>
  );
}