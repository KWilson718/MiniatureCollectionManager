'use client'

import { useRouter } from "next/navigation";

import { Stack, Button, Box} from "@mui/material";

import FilterListComponent from "@/components/filterList/filterListComponent";
import data from '../../components/filterList/testData';



export default function SelectMini() {
    const router = useRouter();

    return(
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
            <h1>Select a Faction to View Miniatures</h1>
            <p>Miniatures are filtered by Brand, then by Game, then by Faction</p>
            <FilterListComponent items={data} />
        </Box>
    );
}