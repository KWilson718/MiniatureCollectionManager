'use client'

import MiniatureListComponent from "@/components/miniatureListing/miniatureList";
import { Box, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function SelectMini(){
    const searchParams = useSearchParams();
    const factionID = searchParams.get("factionID");

    const theme = useTheme();

    if (!factionID) {
        return (
            <Box
                sx={{
                    m: 0,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h2">
                    No factionID provided in the query parameters.
                </Typography>
            </Box>
        );
    }

    return(
        <Box
            sx={{
                m: 0,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
        >
            <Typography variant="h2">Click On A Miniature to View More Info</Typography>
            <Typography variant="h5">Currently Looking for Miniatures from Faction: {factionID}</Typography>
            <MiniatureListComponent factionID={factionID} />
        </Box>
    );
}