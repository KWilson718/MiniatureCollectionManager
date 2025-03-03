import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Paper, Typography, useTheme, Box, ToggleButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GameListComponent from "../gameListing/gameList";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Brand({brandID, title, description, editBrand, deleteBrand}) {
    const [selected, setSelected] = useState(false);

    const theme = useTheme();

    const handleEdit = () => {
        editBrand(brandID);
    }

    const handleDelete = () => {
        deleteBrand(brandID);
    }

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
                    padding: 2,
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                }}
            >
                <Box sx={{display: 'flex', width: 1}}>
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
                                width: 5/6,
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
                                height: '6rem',
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
                                height: '6rem',  
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
                            backgroundColor: theme.palette.secondary.main, // Ensure background matches theme
                            color: theme.palette.secondary.contrastText,   // Use contrast text color
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.secondary.main, // Keep background consistent when selected
                                color: theme.palette.secondary.contrastText,   // Keep text color consistent
                            },
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.dark, // Optional: Add a hover effect
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: 1/4,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            color={theme.palette.secondary.contrastText}
                        >
                            {selected ? 
                                <KeyboardArrowDownIcon sx={{ color: theme.palette.secondary.contrastText, fontSize: "3rem" }} /> 
                                : 
                                <KeyboardArrowRightIcon sx={{ color: theme.palette.secondary.contrastText, fontSize: "3rem" }} />
                            }
                        </Box>
                    </ToggleButton>
                </Box>
                
                {selected ? (
                    <Box
                        sx={{
                            width: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <GameListComponent brandID={brandID} />
                    </Box>           
                
                ) : (<></>)} 
            </Paper>
        </>
    );
}