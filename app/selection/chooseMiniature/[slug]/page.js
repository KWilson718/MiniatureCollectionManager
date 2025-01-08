import { Box, Typography } from "@mui/material";

export default async function SelectMini({ params }){
    const slug = (await params).slug

    return(
        <Box>
            <h1>Click On A Miniature to View More Info</h1>
            <Typography variant="h5">Currently Looking for Miniatures from Faction: {slug}</Typography>
        </Box>
    );
}