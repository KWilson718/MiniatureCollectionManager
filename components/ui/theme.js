import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#53fffb',
        light: '#76fffc',
        dark: '#00fffb',
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