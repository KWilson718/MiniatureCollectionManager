import React from "react";
import { Paper, Typography, useTheme } from "@mui/material";

export default function ListItem({title, description}) {
    const theme = useTheme();

    return (
        <Paper
            elevation={2}
            sx={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
            }}
        >
            <Typography variant="h4">{title}</Typography>
            <Typography variant="p" sx={{paddingTop: .75}}>{description}</Typography>
        </Paper>
    );
}