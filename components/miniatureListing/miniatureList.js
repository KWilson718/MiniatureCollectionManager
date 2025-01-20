import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Divider } from "@mui/material";
import Miniature from "./miniature";

export default function MiniatureListComponent({ factionID }) {
    const [miniatureDialogOpen, setMiniatureDialogOpen] = useState(false);
    const [miniatureName, setMiniatureName] = useState('');
    const [miniatureDescription, setMiniatureDescription] = useState('');
    const [qtyNOS, setQtyNOS] = useState(0);
    const [qtyBuilt, setQtyBuilt] = useState(0);
    const [qtyPrimed, setQtyPrimed] = useState(0);
    const [qtyPartially, setQtyPartially] = useState(0);
    const [qtyBattleReady, setQtyBattleReady] = useState(0);
    const [qtyParadeReady, setQtyParadeReady] = useState(0);

    const [miniatureData, setMiniatureData] = useState({});
    
    const theme = useTheme();

    const router = useRouter();

    const fetchMiniatures = useCallback(async () => {
        try {
            const response = await fetch(`/api/database?type=miniature&factionID=${factionID}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setMiniatureData(data);
        } catch (error) {
            console.error('Error fetching factions:', error);
            setMiniatureData({}); // Fallback to an empty state
        }
    }, [factionID]);
    
    useEffect(() => {
        fetchMiniatures();
    }, [fetchMiniatures]);

    const handleRefreshMiniatures = () => {
        fetchMiniatures();
    };

    const handleMiniatureDialogSubmit = async () => {
        try {
            const response  = await fetch('/api/database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Miniature',
                    data: {
                        parentID: factionID,
                        name: miniatureName,
                        description: miniatureDescription,
                        quantities: [qtyNOS, qtyBuilt, qtyPrimed, qtyPartially, qtyBattleReady, qtyParadeReady],
                    }
                })
            });

            if (response.ok) {
                console.log('Miniature Successfully Added!');
                fetchMiniatures();
                setMiniatureName('');
                setMiniatureDescription('');
                setQtyNOS(0);
                setQtyBuilt(0); 
                setQtyPrimed(0); 
                setQtyPartially(0); 
                setQtyBattleReady(0);
                setQtyParadeReady(0);
            }
            else {
                console.error('Failed to add miniature.');
            }
        }
        catch(err){
            console.error("Error Adding Miniature", err);
        }

        setMiniatureDialogOpen(false);
    }

    if (!Array.isArray(miniatureData)) {
        return <div><h1>Loading Miniatures</h1></div>;
    }
    
    return (
        <>
            <Stack
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
                sx={{
                    width: 3/5,
                    marginTop: 1,
                }}
            >
                {miniatureData.map((miniature) => (
                    <Miniature key={miniature.id} factionID={factionID} miniatureID={miniature.id} title={miniature.miniatureName} description={miniature.miniatureDescription} quantities={[miniature.qtyUnassembled, miniature.qtyBuilt, miniature.qtyPrimed, miniature.qtyPartiallyPainted, miniature.qtyBattleReady, miniature.qtyParadeReady]} />
                ))}
            </Stack>
            <Button
                variant="contained"
                color="secondary"
                sx={{
                    width: 1/2,
                    marginTop: 4,
                    padding: 1,
                }}
                onClick={() => {
                    console.log("Create Miniature Button Clicked!");
                    setMiniatureDialogOpen(true);
                }}
            >
                <Typography variant='h5'>Add Miniature</Typography>
            </Button>

            <Dialog
                open={miniatureDialogOpen} 
                onClose={() => setMiniatureDialogOpen(false)}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                }} 
            >
                <DialogTitle>Add New Miniature</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Miniature Name"
                        fullWidth
                        value={miniatureName}
                        onChange={(e) => setMiniatureName(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        label="Miniature Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={miniatureDescription}
                        onChange={(e) => setMiniatureDescription(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity New On Sprue"
                        fullWidth
                        value={qtyNOS}
                        onChange={(e) => setQtyNOS(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity Built"
                        fullWidth
                        value={qtyBuilt}
                        onChange={(e) => setQtyBuilt(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity Primed"
                        fullWidth
                        value={qtyPrimed}
                        onChange={(e) => setQtyPrimed(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity Partially Painted"
                        fullWidth
                        value={qtyPartially}
                        onChange={(e) => setQtyPartially(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity Battle Ready"
                        fullWidth
                        value={qtyBattleReady}
                        onChange={(e) => setQtyBattleReady(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity Parade Ready"
                        fullWidth
                        value={qtyParadeReady}
                        onChange={(e) => setQtyParadeReady(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMiniatureDialogOpen(false)} variant="contained" color="secondary">Cancel</Button>
                    <Button onClick={handleMiniatureDialogSubmit} variant="contained" color="secondary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}