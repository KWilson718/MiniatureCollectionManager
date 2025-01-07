import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material";

export default function FactionListComponent({gameID}) {
    const [factionDialogOpen, setFactionDialogOpen] = useState(false);
    const [factionName, setFactionName] = useState('');
    const [factionDescription, setFactionDescription] = useState('');

    const [factionData, setFactionData] = useState({});

    const theme = useTheme();

    const router = useRouter();

    if (!Array.isArray(factionData)) {
        return <div><h1>Loading Factions</h1></div>;
    }

    return(
        <>
            <h1>Faction List Here</h1>
        </>
    );
}