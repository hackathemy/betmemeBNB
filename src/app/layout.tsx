"use client";

import "@/styles/globals.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>BetMeme</title>
        <meta
          name="description"
          content="Bet with meme coins in the base ecosystem!"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
