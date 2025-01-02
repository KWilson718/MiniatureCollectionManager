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
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        '& .MuiBreadcrumbs-separator': {
          color: 'primary.main', // Separator color from theme
        },
      }}
    >
      <Link
        onClick={() => handleClick('/')}
        sx={{
          color: 'secondary.main', // Apply secondary color to links
          cursor: 'pointer',
          '&:hover': {
            color: 'secondary.light', // Hover effect
          },
        }}
      >
        Home
      </Link>
      {pathnames.map((value, index) => {
        const href = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography
            key={value}
            sx={{
              color: 'primary.dark', // Apply dark primary color for the active breadcrumb
            }}
          >
            {formatLabel(value)}
          </Typography>
        ) : (
          <Link
            onClick={() => handleClick(href)}
            sx={{
              color: 'secondary.main',
              cursor: 'pointer',
              '&:hover': {
                color: 'secondary.light',
              },
            }}
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
    selection: 'Find Miniature',
    products: 'Products',
    about: 'About Us',
  };

  return labelMap[value] || value.charAt(0).toUpperCase() + value.slice(1);
};

export default CustomBreadcrumbs;
