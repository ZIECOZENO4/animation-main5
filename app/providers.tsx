"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { WagmiProvider, cookieToInitialState } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { config } from "@/lib/config";
import { TenstackProviders } from "./tenstack-provider";



const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
  cookie: string | null;
};

export default function Providers({ children, cookie }: Props) {
  const initialState = cookieToInitialState(config, cookie);
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <WagmiProvider config={config} initialState={initialState}>
            <TenstackProviders>
              <RainbowKitProvider
                theme={darkTheme({
                  accentColor: "#0E76FD",
                  accentColorForeground: "white",
                  borderRadius: "large",
                  fontStack: "system",
                  overlayBlur: "small"
                })}
              >
                {children}
              </RainbowKitProvider>
            </TenstackProviders>
          </WagmiProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
