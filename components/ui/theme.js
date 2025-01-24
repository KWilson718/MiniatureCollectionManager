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
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: '#282828',
          },
          columnHeaders: {
            backgroundColor: '#282828',
            color: '#ffffff',
          },
          footerContainer: {
            backgroundColor: '#282828',
            color: '#ffffff',
          },
        },
      },
    }
  });

export default theme;