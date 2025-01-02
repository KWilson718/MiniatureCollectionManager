import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
        light: '#63a4ff',
        dark: '#004ba0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#dc004e',
        light: '#ff5c8d',
        dark: '#9a0036',
        contrastText: '#000000',
      },
    },
  });

export default theme;