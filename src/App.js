import React from 'react';
import DiapersCatalog from "./views/DiapersCatalog";
import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import './App.css'


const App = () => {
    const theme = createTheme({
       palette: {
    primary: {
      main: blue[500],
    },
    background: {
        main: rgb(209, 162, 162)
    },
    tonalOffset: {
      light: 0.1,
      dark: 0.9,
    },
  },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{height:"100vh", width:"100vw",  display:"flex",alignItems:"center",justifyContent:"center", backgroundColor:theme.palette}}>
                <DiapersCatalog />
            </Box>
        </ThemeProvider>
    );
};

export default App;