import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Divider } from "@mui/material";
import Faction from "./faction";

export default function FactionListComponent({gameID}) {
    const [factionDialogOpen, setFactionDialogOpen] = useState(false);
    const [factionName, setFactionName] = useState('');
    const [factionDescription, setFactionDescription] = useState('');

    const [factionData, setFactionData] = useState({});

    const theme = useTheme();

    const router = useRouter();

    const fetchFactions = useCallback(async () => {
        try {
            const response = await fetch(`/api/database?type=faction&gameID=${gameID}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setFactionData(data);
        } catch (error) {
            console.error('Error fetching factions:', error);
            setFactionData({}); // Fallback to an empty state
        }
    }, [gameID]);
    
    useEffect(() => {
        fetchFactions();
    }, [fetchFactions]);

    const handleRefreshGames = () => {
        fetchFactions();
    };

    const handleFactionDialogSubmit = async () => {
        try{
            console.log(`Handling the Following Request:\nGameID - ${gameID}\nFactionName - ${factionName}\nFactionDescription - ${factionDescription}`);
            const response = await fetch('api/database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Faction',
                    data: {
                        parentID: gameID,
                        name: factionName,
                        description: factionDescription,
                    }
                })
            });

            if (response.ok) {
                console.log('Faction Successfully Added!');
                handleRefreshGames();
                setFactionName('');
                setFactionDescription('');
            }
            else {
                console.error('Failed to add faction.');
            }
        }
        catch (err) {
            console.error('Error Adding Faction: ', err);
        }

        setFactionDialogOpen(false);
    };

    if (!Array.isArray(factionData)) {
        return <div><h1>Loading Factions</h1></div>;
    }

    return(
        <>
            <Stack
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
                sx={{
                    width: 4/5
                }}
            >
                {factionData.map((faction) => (
                    <Faction key={faction.id} factionID={faction.id} title={faction.factionName} description={faction.factionDescription} />
                ))}
            </Stack>
            <Button
                variant="contained"
                color="primary"
                sx={{
                    width: 1/2,
                    marginTop: 2,
                    padding: 1,
                }}
                onClick={() => {
                    console.log('Add Faction Button Clicked');
                    setFactionDialogOpen(true);
                }}
            >
                <Typography variant="h6">Add Faction</Typography>
            </Button>

            <Dialog
                open={factionDialogOpen}
                onClose={() => setFactionDialogOpen(false)}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                }}  
            >
                <DialogTitle>Add New Faction</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Faction Name"
                        fullWidth
                        value={factionName}
                        onChange={(e) => setFactionName(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        label="Faction Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={factionDescription}
                        onChange={(e) => setFactionDescription(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setFactionDialogOpen(false)} variant="contained" color="secondary">Cancel</Button>
                    <Button onClick={handleFactionDialogSubmit} variant="contained" color="secondary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}