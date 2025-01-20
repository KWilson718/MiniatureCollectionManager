'use client'

import React from "react";
import { useState, useEffect, useCallback} from "react";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function SingleMiniaturePage(){
    const searchParams = useSearchParams();
    const miniatureID = searchParams.get("miniatureID");

    const [miniatureData, setMiniatureData] = useState({});

    const theme = useTheme();

    const router = useRouter();

    const fetchMiniature = useCallback(async () => {
        try {
            const response = await fetch(`/api/database?type=miniature&miniatureID=${miniatureID}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setMiniatureData(data[0]);
        } catch (err) {
            console.error('Error fetching miniature:', err);
            setMiniatureData({});
        }
    }, [miniatureID]);

    const handleRefreshMiniature = () => {
        fetchMiniature();
    };

    useEffect(() => {
        if (miniatureID) {
            fetchMiniature();
        }
    }, [fetchMiniature, miniatureID]);

    return (
        <Box
            sx={{
                m: 0,
                p: 2,
                paddingTop: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
        >
            <Typography variant="h3">{miniatureData.miniatureName}</Typography>
            <Typography variant='p'>{JSON.stringify(miniatureData)}</Typography>
        </Box>
    );
}