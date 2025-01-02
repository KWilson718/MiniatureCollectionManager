'use client'

import { useRouter } from "next/navigation";

import { Box, Button } from '@mui/material';

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <h1>Miniature Collection Manager</h1>
      <p>This should be a great way to track data about miniature collections</p>
      <Button
        onClick={() => {
          router.push('/selection')
        }}  
        variant="outlined"
        color="secondary"
      >View Collection</Button>
    </Box>
  );
}
