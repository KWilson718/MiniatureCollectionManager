import { Button, Paper, Typography, useTheme, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Miniature({ factionID, miniatureID, title, description, quantities }) {
    const theme = useTheme();

    const router = useRouter();

    const inProgress = Array.isArray(quantities) ? ((quantities[0] + quantities[1] + quantities[2] + quantities[3])) : 0;

    const completed = Array.isArray(quantities) ? ((quantities[4] + quantities[5])) : 0;

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
                <Box>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="h5">{description}</Typography>
                </Box>
                <Box>
                    <Typography variant="h6">In Progress: {inProgress}</Typography>
                    <Typography variant="h6">Completed: {completed}</Typography>
                </Box>
            </Button>
        </Paper>
    );
}