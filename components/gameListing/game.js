import React from 'react';
import { useState } from 'react';
import { Paper, Box, Typography, ToggleButton, useTheme, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FactionListComponent from '../factionListing/factionList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Game({gameID, title, description, editGame, deleteGame}) {
    const [selected, setSelected] = useState(false);

    const theme = useTheme();

    const handleEdit = () => {
        editGame(gameID);
    };

    const handleDelete = () => {
        deleteGame(gameID);
    };

    return(
        <>
            <Paper
                elevation={3}
                sx={{
                    width: 1,
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    padding: 2,
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                }}
            >
                <Box sx={{ display: 'flex', width: 1 }}>
                    <ToggleButton
                        value="check"
                        selected={selected}
                        onChange={() => setSelected((prevSelected) => !prevSelected)}
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.secondary.contrastText,
                            },
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.dark,
                            },
                        }}
                    >
                        <Box sx={{ width: 1 / 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <MenuBookIcon sx={{ color: theme.palette.secondary.contrastText, fontSize: "3rem" }} />
                        </Box>
                        <Box sx={{ width: 1 / 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h5">{title}</Typography>
                            {description && <Typography variant="body2" sx={{ paddingTop: 0.75 }}>{description}</Typography>}
                        </Box>
                    </ToggleButton>

                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Button 
                            onClick={handleEdit} 
                            sx={{ 
                                color: theme.palette.secondary.contrastText,
                                height: '5rem',
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.secondary.contrastText,
                                '&.Mui-selected': {
                                    backgroundColor: theme.palette.secondary.main,
                                    color: theme.palette.secondary.contrastText,
                                },
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.dark,
                                }, 
                            }}
                        >
                            <EditIcon />
                        </Button>
                        <Button 
                            onClick={handleDelete} 
                            sx={{ 
                                color: theme.palette.secondary.contrastText,
                                height: '5rem',  
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.secondary.contrastText,
                                '&.Mui-selected': {
                                    backgroundColor: theme.palette.secondary.main,
                                    color: theme.palette.secondary.contrastText,
                                },
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.dark,
                                }, 
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                    </Box>

                    <ToggleButton
                        value="check"
                        selected={selected}
                        onChange={() => setSelected((prevSelected) => !prevSelected)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.secondary.contrastText,
                            },
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.dark,
                            },
                        }}
                    >
                        <Box sx={{ width: 1 / 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {selected ? 
                                <KeyboardArrowDownIcon sx={{ color: theme.palette.secondary.contrastText, fontSize: "3rem" }} /> 
                                : 
                                <KeyboardArrowRightIcon sx={{ color: theme.palette.secondary.contrastText, fontSize: "3rem" }} />
                            }
                        </Box>
                    </ToggleButton>
                </Box>

                {selected && (
                    <Box sx={{ width: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <FactionListComponent gameID={gameID} />
                    </Box>
                )}
            </Paper>
        </>
    );
}