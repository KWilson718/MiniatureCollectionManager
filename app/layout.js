import React from 'react';
import './globals.css';
import CustomBreadcrumbs from '../components/ui/Breadcrumbs';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='root'>
      <body className='rootBody'>
        <header>
          <CustomBreadcrumbs />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
