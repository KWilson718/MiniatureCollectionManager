'use client'

import { Box } from "@mui/material";

import BrandListComponent from "@/components/brandListing/brandList";



export default function SelectMini() {

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

            
            <BrandListComponent />
        </Box>
    );
}