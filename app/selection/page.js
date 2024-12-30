'use client'

import { useRouter } from "next/navigation";

import Button from '@mui/material/Button';


export default function SelectMini() {
    const router = useRouter();

    return(
        <div>
            <h1>Select a Faction to View Miniatures</h1>
            <p>Miniatures are filtered by Brand, then by Game, then by Faction</p>
        </div>
        
    );
}