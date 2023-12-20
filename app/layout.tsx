// ./app/layout.tsx
'use client';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { flowbiteTheme } from "./theme";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import { twMerge } from "tailwind-merge";

import { DashboardSidebar } from "./sidebar";
import { DashboardNavbar } from "./navbar";
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={twMerge("bg-gray-50 dark:bg-gray-900", inter.className)}>
        <Flowbite theme={{ theme: flowbiteTheme }}>
          <DashboardNavbar />
          <DashboardSidebar />
          {children}
        </Flowbite>
      </body>
    </html>
  );
}