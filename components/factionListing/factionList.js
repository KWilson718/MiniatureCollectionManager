import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material";

export default function FactionListComponent() {
    const theme = useTheme();

    const router = useRouter();

    return(
        <>
            <h1>Faction List Here</h1>
        </>
    );
}