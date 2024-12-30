'use client';

import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

const CustomBreadcrumbs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter((x) => x);

  const handleClick = (href) => {
    router.push(href);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color="inherit"
        onClick={() => handleClick('/')}
        sx={{ cursor: 'pointer' }}
      >
        Home
      </Link>
      {pathnames.map((value, index) => {
        const href = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography color="textPrimary" key={value}>
            {formatLabel(value)}
          </Typography>
        ) : (
          <Link
            color="inherit"
            onClick={() => handleClick(href)}
            sx={{ cursor: 'pointer' }}
            key={value}
          >
            {formatLabel(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

const formatLabel = (value) => {
    const labelMap = {
        products: 'Products',
        about: 'About Us',
    };

    return labelMap[value] || value.charAt(0).toUpperCase() + value.slice(1);
};
  

export default CustomBreadcrumbs;
