import React from 'react';
import { useState } from 'react';
import { Paper, Box, Typography, ToggleButton, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FactionListComponent from '../factionListing/factionList';

export default function Game({gameID, title, description}) {
    const [selected, setSelected] = useState(false);

    const theme = useTheme();

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
                <ToggleButton
                    value="check"
                    selected={selected}
                    onChange={() => setSelected((prevSelected) => !prevSelected)}
                    sx={{
                        width: 1,
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
                    >
                        <MenuBookIcon 
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
                        <Typography variant="h5">{title}</Typography>
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
                        {selected ? 
                            <KeyboardArrowDownIcon sx={{ color: theme.palette.secondary.contrastText, fontSize: "3rem" }} /> 
                            : 
                            <KeyboardArrowRightIcon sx={{ color: theme.palette.secondary.contrastText, fontSize: "3rem" }} />
                        }
                    </Box>
                </ToggleButton>
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
                        <FactionListComponent gameID={gameID} />
                    </Box>
                ):(<></>)}
            </Paper>
        </>
    );
}