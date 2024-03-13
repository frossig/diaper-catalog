import { Backdrop,  CircularProgress, Typography } from '@mui/material'
import React from 'react'

const Loader = (props) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: "flex", alignContent: "center", flexDirection: "column", justifyContent: "center", gap:"1rem" }}
            open={props.loading}
        >
                <CircularProgress color="inherit" />
                <Typography>Cargando Resultados...</Typography>
        </Backdrop>
    )
}

export default Loader