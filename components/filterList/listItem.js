import React from "react";
import { useState } from "react";
import { Paper, Typography, useTheme, Box, ToggleButton } from "@mui/material";
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
                display: "flex",
                justifyContent: 'space-evenly',
                alignItems: 'center',
                padding: 2,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
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
            
        </Paper>
    );
}