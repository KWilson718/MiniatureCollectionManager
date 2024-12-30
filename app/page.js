'use client'

import { useRouter } from "next/navigation";

import Button from '@mui/material/Button';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Miniature Collection Manager</h1>
      <p>This should be a great way to track data about miniature collections</p>
      <Button
        onClick={() => {
          router.push('/selection')
        }}
        variant="outline"
      >View Collection</Button>
    </div>
  );
}
