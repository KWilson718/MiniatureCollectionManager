import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Typography, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Divider } from "@mui/material";
import Game from "./game";

export default function GameListComponent({brandID}) {
    const [gameDialogEditMode, setGameDialogEditMode] = useState(false); // Create mode when false, edit mode when true
    const [gameEditPrevVal, setGameEditPrevVal] = useState({});

    const [gameDialogOpen, setGameDialogOpen] = useState(false);
    const [gameName, setGameName] = useState('');
    const [gameDescription, setGameDescription] = useState('');

    const [gameData, setGameData] = useState({});

    const theme = useTheme();

    const router = useRouter();

    const fetchGames = useCallback(async () => {
        try {
            const response = await fetch(`/api/database?type=game&brandID=${brandID}`);
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

    const handleRefreshGames = () => {
        fetchGames();
    };

    const handleAddGame = async () => {
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
    }

    const handleEditGame = async () => {
        try {
            const response = await fetch('/api/database', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Game',
                    data: {
                        id: gameEditPrevVal.id,
                        parentID: gameEditPrevVal.gameID,
                        name: gameName,
                        description: gameDescription,
                    }
                })
            });

            if (response.ok) {
                console.log('Game Successfully Edited!');
                fetchGames();
                setGameName('');
                setGameDescription('');
                setGameEditPrevVal({});
            }
            else {
                console.error('Failed to edit game');
            }
        }
        catch (err) {
            console.error("Error Editing Game:", err);
        }
    }

    const handleGameDialogSubmit = async () => {
        try {
            if (gameDialogEditMode) {
                handleEditGame();
            }
            else {
                handleAddGame();
            }
        }
        catch (err) {
            console.error("Error in Handle Game Dialog Function:", err);
        }

        setGameDialogOpen(false);
    };

    const handleDeleteGame = async (gameID) => {
        console.log("Handle Delete Game clicked with Game ID:", gameID);
        const gameToDelete = gameData.find(object => object.id === gameID);
        console.log("Game To Delete:", gameToDelete);
        
        try {
            const response = await fetch('/api/database', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Game',
                    id: gameToDelete.id
                })
            });

            if (response.ok) {
                console.log('Game Successfully Deleted');
                fetchGames();
                setGameName('');
                setGameDescription('');
            }
            else{
                console.error('Failed to delete game');
                console.error('Responded with', response);
            }
        }
        catch(err) {
            console.error('Error Deleting Game', err);
        }
    };

    const handleEditPrep = async (gameID) => {
        console.log("Handle Edit Game clicked with Game ID:", gameID);
        const gameToEdit = gameData.find(object => object.id === gameID);
        console.log("Editing Game:", gameToEdit);
        setGameEditPrevVal(gameToEdit);
        setGameName(gameToEdit.gameName);
        setGameDescription(gameToEdit.gameDescription || '');
        setGameDialogEditMode(true);
        setGameDialogOpen(true);
    };

    if (!Array.isArray(gameData)) {
        return <div><h1>Loading Games</h1></div>;
    }

    return (
        <>
            <Stack
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
                sx={{
                    width: 7/8,
                    marginTop: 1,
                }}
            >
                {gameData.map((game) => (
                    <Game key={game.id} gameID={game.id} title={game.gameName} description={game.gameDescription} editGame={() => handleEditPrep(game.id)} deleteGame={() => handleDeleteGame(game.id)} />
                ))}
            </Stack>
            <Button
                variant="contained"
                color="primary"
                sx={{
                    width: 1/2,
                    marginTop: 4,
                    padding: 1,
                }}
                onClick={() => {
                    console.log('Add Game Button Clicked');
                    setGameDialogOpen(true);
                }}
            >
                <Typography variant="h5">Add Game</Typography>
            </Button>

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
                <DialogTitle>{gameDialogEditMode ? 'Edit Game' : 'Add New Game'}</DialogTitle>
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