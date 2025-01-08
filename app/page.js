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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <h1>Miniature Collection Manager</h1>
      <p>The One Stop Shop to Organizing Your Wargaming Miniature Collection</p>
      <Button
        onClick={() => {
          router.push('/selection')
        }}  
        variant="contained"
        color="secondary"
      >View Collection</Button>
    </Box>
  );
}
