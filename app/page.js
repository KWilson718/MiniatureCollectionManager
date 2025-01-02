'use client'

import { useRouter } from "next/navigation";

import { Box, Button } from '@mui/material';

export default function Home() {
  const router = useRouter();

  return (
    <Box

    >
      <h1>Miniature Collection Manager</h1>
      <p>This should be a great way to track data about miniature collections</p>
      <Button
        onClick={() => {
          router.push('/selection')
        }}
        variant="outline"
        color="primary"
      >View Collection</Button>
    </Box>
  );
}
