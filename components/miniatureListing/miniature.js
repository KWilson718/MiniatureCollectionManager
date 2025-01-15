import { Button, Paper, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Miniature({ factionID, miniatureID, title, description, quantities }) {
    const theme = useTheme();

    const router = useRouter();

    return(
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
            <Button
                variant="text"
                color="primary"
                sx={{
                    width: 1,
                    padding: 1,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    paddingRight: 2,
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
                onClick={() => {
                    router.push(`/selection/chooseMiniature/singleMiniature?miniatureID=${miniatureID}`);
                }}
            >
                <Typography variant="h5">Title: {title}</Typography>
                <Typography variant="h5">Description: {description}</Typography>
                <Typography variant="h6">Potentially some Quantities {JSON.stringify(quantities)}</Typography>
            </Button>
        </Paper>
    );
}