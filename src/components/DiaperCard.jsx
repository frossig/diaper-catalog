import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import React, { useState } from 'react'



const style = {
    card: {
        display: { xs: 'block', xl: "flex" }
    },
    image: {
        width: { xs: 'unset', xl: 250 },
        height: { xs: 140, xl: 250 },
        objectFit: "cover"
    },
    content: {
        display: "flex",
        gap: "1rem",
        flexDirection: "column"
    },
    details: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: { xs: "column", lg: "row" }
    },
    pricing: {
        width: { xs: "100%", lg: "unset" },
        textAlign: "start"
    },
    stock: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        // justifyContent: { xs: "center", lg: "start" }
    },
    stockTitle: {
        marginRight: { md: "1rem", xl: "2rem" }
    },
    actions: {
        flexDirection: { xs: "column", lg: "row" },
        padding: "unset"
    },
    presentation: {
        width: { xs: "100%", lg: "unset" },
        textAlign: "start"
    },
    stack: {
        display: "flex",
        alignItems: "center",
        gap: ".5rem",
        justifyContent: "center"
    },
    button: {
        fontWeight: "bold"
    }

}

const DiaperCard = (props) => {
    const theme = useTheme();
    const currentVariant = props.group.variants[0];
    const [selectedVariant, setSelectedVariant] = useState(currentVariant);

    //promedio = suma de números / cantidad de números sumados
    const calculateAveragePrice = (variants) => {
        let total = 0;

        variants.forEach((variant) => {
            total += parseFloat(variant.price);
        });

        const averagePrice = (total / variants.length).toFixed(2);
        return averagePrice;
    };

    const handleSelectVariant = (variant) => setSelectedVariant(variant);

    const findGroupStock = variant => {
        return Object.keys(variant).includes(props.group.option)
    }

    const isGroupInStock = findGroupStock(props.group.presentationsBySizeInStock);
    const averagePrice = calculateAveragePrice(props.group.variants);





    return (
        <Card raised sx={style.card}>
            <CardMedia
                sx={style.image}
                image={props.group.image.src}
                title={props.group.vendor + ' ' + props.group.option}
            />
            <CardContent sx={style.content}>
                <Typography gutterBottom variant="h5" component="div">
                    {props.group.vendor + ' - ' + props.group.option}
                </Typography>
                <Box sx={style.details}>
                    <Typography gutterBottom variant="h6" component="div" sx={style.pricing}>
                        Price: ${selectedVariant.price}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={style.pricing}>
                        Average Price: ${averagePrice}
                    </Typography>
                </Box>
                <Box sx={style.stock}>
                    <Typography variant="h6" component="div" sx={style.stockTitle}>
                        Availability
                    </Typography>
                    {
                        isGroupInStock ? (
                            <Chip
                                icon={<CheckCircleOutlineIcon sx={{
                                    '&.MuiChip-icon': {
                                        color: theme.palette.primary.light
                                    }
                                }} />}
                                label="In Stock!"
                                sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.light }}
                            />

                        ) : (
                            <Chip
                                icon={<SentimentVeryDissatisfiedIcon />}
                                label="NO Stock"
                                color="error"
                                variant="outlined"
                            />
                        )


                    }
                </Box>
                <CardActions sx={style.actions} >
                    <Typography variant="h6" sx={style.presentation}>Presentations</Typography>
                    <Stack direction="row" sx={style.stack}>
                        {props.group.variants
                            .sort((a, b) => (a.option2) - (b.option2))
                            .map((variant, idx) => (
                                <Button key={idx} sx={style.button} onClick={() => handleSelectVariant(variant)} variant="contained" size="small">{variant.option2}</Button>
                            ))
                        }
                    </Stack>


                </CardActions>
            </CardContent>
        </Card>
    );
}


export default DiaperCard