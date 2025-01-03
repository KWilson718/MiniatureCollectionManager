'use client'

import { useRouter } from "next/navigation";

import { Stack, Button, Box, Paper, useTheme, Typography} from "@mui/material";

import FilterListComponent from "@/components/filterList/filterListComponent";
import data from '../../components/filterList/testData';



export default function SelectMini() {
    const theme = useTheme();

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
            <Button
                sx={{
                    width: 1/2,
                    marginTop: 2,
                    padding: 2
                }}
                color="secondary"
                variant="contained"
                onClick={() => {
                    console.log("Create Brand Button Clicked!");
                }}
            >
                <Typography variant="h4">Create Brand</Typography>
            </Button>
        </Box>
    );
}