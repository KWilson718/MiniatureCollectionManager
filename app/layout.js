'use client'

import React from 'react';
import './globals.css';
import CustomBreadcrumbs from '@/components/ui/breadcrumbs';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/components/ui/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="root">
      <body className="rootBody">
        <ThemeProvider theme={theme}>
          {/* CssBaseline for consistent styling */}
          <CssBaseline />
          <header 
            className="navHeader"
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
            }}  
          >
            <CustomBreadcrumbs />
          </header>
          <main 
            className="mainApp"
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
