import React from 'react';
import DiapersCatalog from "./views/DiapersCatalog";
import { ThemeProvider, createTheme } from '@mui/material';
import { blue, green } from '@mui/material/colors';


const App = () => {
    const theme = createTheme({
       palette: {
    primary: {
      main: blue[500],
    },
    tonalOffset: {
      light: 0.1,
      dark: 0.9,
    },
  },
    });

    return (
        <ThemeProvider theme={theme}>
            <DiapersCatalog />
        </ThemeProvider>
    );
};

export default App;