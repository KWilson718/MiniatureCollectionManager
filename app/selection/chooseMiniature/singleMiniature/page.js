'use client'

import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function SingleMiniaturePage(){
    const searchParams = useSearchParams();
    const miniatureID = searchParams.get("miniatureID");

    const theme = useTheme();

    const router = useRouter();

    return (
        <Box>
            <Typography variant="h2">This is the individual Miniature Page & is under development</Typography>
        </Box>
    );
}