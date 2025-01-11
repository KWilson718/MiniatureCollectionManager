import { Paper, Typography } from "@mui/material";

export default function Miniature({ factionID, miniatureID, title, description, quantities }) {
    return(
        <Paper>
            <Typography variant="h5">Title: {title}</Typography>
            <Typography variant="h5">Description: {description}</Typography>
            <Typography variant="h6">Potentially some Quantities</Typography>
        </Paper>
    );
}