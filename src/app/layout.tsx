"use client";
import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Gothic_A1 } from "next/font/google";
import "@/styles/globals.scss";
import { LangProvider } from "@/lang";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Header from "@/components/Header";
import VideoBackground from "@/components/bg-video";

const gothicA1 = Gothic_A1({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-gothic-a1",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Khởi tạo QueryClient trong component để nó không bị chia sẻ giữa các yêu cầu
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  }));

  return (
    <html suppressHydrationWarning className="dark">
      <head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`antialiased ${gothicA1.variable}`}>
       
        <QueryClientProvider client={queryClient}>
          <LangProvider>
            <div className="min-h-screen bg-[#747474] dark:bg-gray-950 transition-colors duration-300 font-gothic-a1">
              <Header />
              <VideoBackground />
              <main className="h-[calc(100vh-64px)] relative z-40">{children}</main>
            </div>
            <ToastContainer theme="dark" />
          </LangProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}