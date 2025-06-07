'use client';
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import ThemeProvider from "@/theme/index";
import { primaryFont, secondaryFont } from '@/theme/typography';
import { Provider } from "react-redux";
import { store } from "../app/store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${primaryFont.variable} ${secondaryFont.variable}`}>
      <head>
        <style jsx global>{`
          :root {
            --font-poppins: ${primaryFont.style.fontFamily};
            --font-barlow: ${secondaryFont.style.fontFamily};
          }
        `}</style>
      </head>
      <body>
      <Provider store={store}>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline/>
              {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </Provider>
      </body>
    </html>
  );
}
