import React from "react";
import { Paper, Typography, useTheme } from "@mui/material";

export default function ListItem({title}) {
    const theme = useTheme();

    return (
        <Paper
            elevation={2}
            sx={{
                padding: 2,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
            }}
        >
            <Typography variant="h4">{title}</Typography>
        </Paper>
    );
}