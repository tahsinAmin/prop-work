import * as React from 'react';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import ThemeProvider from "@/theme/index";
import { AuthProvider } from '@/contexts/auth-context';

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <InitColorSchemeScript attribute="class"/>
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
            <ThemeProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <AuthProvider>
                    {props.children}
                </AuthProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
