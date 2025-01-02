'use client'

import { useRouter } from "next/navigation";

import { Stack, Button } from "@mui/material";


export default function SelectMini() {
    const router = useRouter();

    return(
        <div>
            <h1>Select a Faction to View Miniatures</h1>
            <p>Miniatures are filtered by Brand, then by Game, then by Faction</p>
            <Stack spacing={1}>
            </Stack>
        </div>
    );
}