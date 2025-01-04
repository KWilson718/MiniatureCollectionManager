import React from "react";
import { useState } from "react";
import { Paper, Typography, useTheme, Box, ToggleButton, Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export default function ListItem({title, description}) {
    const [selected, setSelected] = React.useState(false);

    const theme = useTheme();

    return (
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
                    <Typography variant="p" sx={{paddingTop: .75}}>{description}</Typography>
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
                        sx={{
                            marginTop: 2,
                            padding: 2,
                        }}
                    >
                        <Typography variant="h5">Add Game</Typography>
                    </Button>
                </Box>           
            
            ) : (<></>)} 
        </Paper>
    );
}