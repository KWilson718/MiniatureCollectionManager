import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#8bfffc',
        light: '#9dfffd',
        dark: '#76fffc',
        contrastText: '#000000',
      },
      secondary: {
        main: '#282828',
        light: '#3f3f3f',
        dark: '#121212',
        contrastText: '#ffffff',
      },
    },
  });

export default theme;