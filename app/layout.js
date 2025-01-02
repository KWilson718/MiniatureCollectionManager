'use client'

import React from 'react';
import './globals.css';
import CustomBreadcrumbs from '../components/ui/Breadcrumbs';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/components/ui/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="root">
      <body className="rootBody">
        <ThemeProvider theme={theme}>
          {/* CssBaseline for consistent styling */}
          <CssBaseline />
          <header className="navHeader">
            <CustomBreadcrumbs />
          </header>
          <main className="mainApp">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
