import React from 'react';
import './globals.css';
import CustomBreadcrumbs from '../components/ui/Breadcrumbs';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='root'>
      <body className='rootBody'>
        <header className='navHeader'>
          <CustomBreadcrumbs />
        </header>
        <main className='mainApp'>{children}</main>
      </body>
    </html>
  );
}
