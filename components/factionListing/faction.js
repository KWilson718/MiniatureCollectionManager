import { Paper, useTheme, Button, Box, Typography } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';

export default function Faction({factionID, title, description}) {
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
                    paddingTop: 1,
                    paddingBottom: 1,
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                }}
            >
                <Button
                    variant="text"
                    color="primary"
                    sx={{
                        width: 3/4,
                        padding: 1,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        paddingRight: 2,
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
                        <GroupIcon 
                            sx={{
                                color: theme.palette.secondary.contrastText,
                                fontSize: "3rem",
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 3/4,
                            marginTop: 2,
                            padding: 1,
                        }}
                    >
                        <Typography variant="h6">{title}</Typography>
                        {description ? (
                            <Typography variant="p" sx={{paddingTop: .75}}>{description}</Typography>
                        ):(<></>)}
                    </Box>
                </Button>
            </Paper>
        </>
    );
}