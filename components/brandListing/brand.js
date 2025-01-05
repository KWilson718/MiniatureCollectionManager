import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Paper, Typography, useTheme, Box, ToggleButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export default function Brand({brandID, title, description}) {
    const [selected, setSelected] = React.useState(false);

    const [gameDialogOpen, setGameDialogOpen] = useState(false);
    const [gameName, setGameName] = useState('');
    const [gameDescription, setGameDescription] = useState('');

    const [gameData, setGameData] = useState({});

    const theme = useTheme();

    const router = useRouter();

    const fetchGames = useCallback(async () => {
        try {
            const response = await fetch(`api/database?type=faction&brandID=${brandID}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setGameData(data);
        } catch (error) {
            console.error('Error fetching games:', error);
            setGameData({}); // Fallback to an empty state
        }
    }, [brandID]);
    
    useEffect(() => {
        fetchGames();
    }, [fetchGames]);
    
    // Later in your code, you can call fetchGames as needed:
    const handleRefreshGames = () => {
        fetchGames();
    };

    const handleGameDialogSubmit = async () => {
        try{
            const response = await fetch('api/database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Game',
                    data: {
                        parentID: brandID,
                        name: gameName,
                        description: gameDescription,
                    }
                })
            });

            if (response.ok) {
                console.log('Game Successfully Added!');
                handleRefreshGames();
                setGameName('');
                setGameDescription('');
            }
            else {
                console.error('Failed to add game.');
            }
        }
        catch (err) {
            console.error('Error Adding Game: ', err);
        }

        setGameDialogOpen(false);
    };

    return (
        <>
            <Paper
                elevation={2}
                sx={{
                    width: 1,
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    paddingTop: 2,
                    paddingBottom: 2,
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                }}
            >
                <Box
                    sx={{
                        width: 1,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            width: 1/4,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <BusinessCenterIcon 
                            sx={{
                                color: theme.palette.secondary.contrastText,
                                fontSize: "3rem",
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: 1/2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4">{title}</Typography>
                        {description ? (
                            <Typography variant="p" sx={{paddingTop: .75}}>{description}</Typography>
                        ):(<></>)}
                    </Box>
                    <Box
                        sx={{
                            width: 1/4,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        color={theme.palette.secondary.contrastText}
                    >
                        <ToggleButton
                            value="check"
                            selected={selected}
                            onChange={() => setSelected((prevSelected) => !prevSelected)}
                        >
                            {selected ? 
                                <KeyboardArrowUpIcon sx={{ color: theme.palette.secondary.contrastText, fontSize: "3rem" }} /> 
                                : 
                                <KeyboardArrowDownIcon sx={{ color: theme.palette.secondary.contrastText, fontSize: "3rem" }} />
                            }
                        </ToggleButton>
                    </Box>
                </Box>
                {selected ? (
                    <Box
                        sx={{
                            width: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                marginTop: 2,
                                padding: 2,
                            }}
                            onClick={() => {
                                console.log('Add Game Button Clicked');
                                setGameDialogOpen(true);
                            }}
                        >
                            <Typography variant="h5">Add Game</Typography>
                        </Button>
                    </Box>           
                
                ) : (<></>)} 
            </Paper>
            <Dialog
                open={gameDialogOpen}
                onClose={() => setGameDialogOpen(false)}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                }}  
            >
                <DialogTitle>Add New Game</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Game Name"
                        fullWidth
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        label="Game Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={gameDescription}
                        onChange={(e) => setGameDescription(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setGameDialogOpen(false)} variant="contained" color="secondary">Cancel</Button>
                    <Button onClick={handleGameDialogSubmit} variant="contained" color="secondary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}