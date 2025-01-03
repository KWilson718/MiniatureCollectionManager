'use client'

import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";

import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, useTheme } from "@mui/material";

import FilterListComponent from "@/components/filterList/filterListComponent";
import data from '../../components/filterList/testData';



export default function SelectMini() {
    const [brandDialogOpen, setBrandDialogOpen] = useState(false);
    const [brandName, setBrandName] = useState('');
    const [brandDescription, setBrandDescription] = useState('');

    const [brandData, setBrandData] = useState({});

    const theme = useTheme();

    const router = useRouter();

    async function fetchItems() {
        const response = await fetch('/api/database');
        const data = await response.json();
        setBrandData(data);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const handleBrandDialogSubmit = async () => {
        try {
            const response  = await fetch('/api/database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Brand',
                    data: {
                        name: brandName,
                        description: brandDescription,
                    }
                })
            });

            if (response.ok) {
                console.log('Brand Successfully Added!');
                fetchItems();
            }
            else {
                console.error('Failed to add brand.');
            }
        }
        catch (err) {
            console.error('Error Adding Brand: ', err);
        }

        setBrandDialogOpen(false);
    }

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

            <p>Current List of Brands from Database Here</p>
            <Typography variant="body1">{JSON.stringify(brandData, null, 2)}</Typography>
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
                    setBrandDialogOpen(true);
                }}
            >
                <Typography variant="h4">Create Brand</Typography>
            </Button>

            <Dialog 
                open={brandDialogOpen} 
                onClose={() => setBrandDialogOpen(false)}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                }} 
            >
                <DialogTitle>Add New Brand</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Brand Name"
                        fullWidth
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        label="Brand Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={brandDescription}
                        onChange={(e) => setBrandDescription(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBrandDialogOpen(false)} variant="contained" color="secondary">Cancel</Button>
                    <Button onClick={handleBrandDialogSubmit} variant="contained" color="secondary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}