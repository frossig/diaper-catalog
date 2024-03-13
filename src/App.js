import React from 'react';
import DiapersCatalog from "./views/DiapersCatalog";
import { Box,  ThemeProvider, createTheme } from '@mui/material';
import './App.css'


const App = () => {
    const theme = createTheme({
       palette: {
    primary: {
      main: "#ffefd5",
      light: "whiteSmoke"
    },
    secondary: {
        main: "#71ab74"
    },
    background: {
        main: "rgb(209, 162, 162)"
    }
  },
    });

    const style = {
        catalog: {
            overflow: "auto",
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.background.main,
            '&::-webkit-scrollbar': {
                width: '0.4em',
                height: "0.4em"
            },
            '&::-webkit-scrollbar-track': {
                background: theme.palette.grey[200]
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: "1rem",
                background: theme.palette.grey[400]
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: theme.palette.grey[400]
            },
            "&::-webkit-scrollbar-button": {
                borderRadius: "1rem",
                height: "50px"
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={style.catalog}>
                <DiapersCatalog />
            </Box>
        </ThemeProvider>
    );
};

export default App;