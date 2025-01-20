'use client'

import MiniatureListComponent from "@/components/miniatureListing/miniatureList";
import { Box, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function SelectMini(){
    const searchParams = useSearchParams();
    const factionID = searchParams.get("factionID");

    const [factionNameData, setFactionNameData] = useState({});
    const [factionName, setFactionName] = useState('');

    const theme = useTheme();

    const router = useRouter();

    const fetchFactionName = useCallback(async () => {
            try {
                console.log('Looking for FactionID: ', factionID);
                const response = await fetch(`/api/database?type=factionName&factionID=${factionID}`);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setFactionNameData(data);
                if (Array.isArray(data)){
                    setFactionName(data[0].factionName);
                }
            } catch (error) {
                console.error('Error fetching factions:', error);
                setFactionNameData({}); // Fallback to an empty state
            }
        }, [factionID]);
        
        useEffect(() => {
            fetchFactionName();
        }, [fetchFactionName]);
    
        const handleRefreshFactionName = () => {
            fetchFactionName();
        };

    if (!factionID) {
        return (
            <Box
                sx={{
                    m: 0,
                    p: 10,
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
            <Typography variant="h2">Click On A Miniature To View More Info</Typography>
            <Typography variant="h5">Miniatures Are From: {factionName}</Typography>
            <MiniatureListComponent factionID={factionID} />
        </Box>
    );
}