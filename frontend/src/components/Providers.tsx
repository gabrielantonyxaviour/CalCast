"use client";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import {
  mainnet,
  optimism,
  arbitrum,
  sepolia,
  optimismSepolia,
  arbitrumSepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "Some App",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [
    mainnet,
    optimism,
    arbitrum,
    sepolia,
    optimismSepolia,
    arbitrumSepolia,
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#111111",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <PrivyProvider
              appId="clu0wgkyq0hbgb53ga3bzdkib"
              config={{
                // Customize Privy's appearance in your app
                appearance: {
                  theme: "#000000",
                  accentColor: "#676FFF",
                  logo: "https://i.ibb.co/g9r44Vm/image-removebg-preview-7.png",
                },
                loginMethods: ["farcaster"],
                // // Create embedded wallets for users who don't have a wallet
                // embeddedWallets: {
                //   createOnLogin: 'users-without-wallets',
                // },
              }}
            >
              {children}
            </PrivyProvider>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
