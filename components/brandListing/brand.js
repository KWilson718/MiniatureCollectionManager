import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Paper, Typography, useTheme, Box, ToggleButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GameListComponent from "../gameListing/gameList";

export default function Brand({brandID, title, description}) {
    const [selected, setSelected] = useState(false);

    const theme = useTheme();

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
                        <GameListComponent brandID={brandID} />
                    </Box>           
                
                ) : (<></>)} 
            </Paper>
        </>
    );
}