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
                                <KeyboardArrowDownIcon sx={{ color: theme.palette.secondary.contrastText, fontSize: "3rem" }} /> 
                                : 
                                <KeyboardArrowRightIcon sx={{ color: theme.palette.secondary.contrastText, fontSize: "3rem" }} />
                            }
                        </ToggleButton>
                    </Box>
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
                        <FactionListComponent />
                    </Box>
                ):(<></>)}
            </Paper>
        </>
    );
}