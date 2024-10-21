'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThirdwebProvider } from 'thirdweb/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ThemeProvider as NextThemesProvider} from "next-themes";

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient} >
      <NextUIProvider>
        <ThirdwebProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
        </ThirdwebProvider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}