import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import React from 'react'

const DiaperCard = (props) => {

    //sumando un grupo de números y dividiendo a continuación por el recuento de esos números. 
    console.log("🚀 ~ GROUP:", props.group);
    const calculateAveragePrice = (variants) => {
        let total = 0;

        variants.forEach((variant) => {
            total += parseFloat(variant.price);
        });

        const averagePrice = (total / variants.length).toFixed(2);
        return averagePrice;
    };


    const findGroupStock = variant => {
        return Object.keys(variant).includes(props.group.option)
    }
    
    const isGroupInStock = findGroupStock(props.group.presentationsBySizeInStock);
    const averagePrice = calculateAveragePrice(props.group.variants);

    return (
        <Card sx={{ maxWidth: 450 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://cdn.shopify.com/s/files/1/0071/2664/6836/products/05912-BN_single_NB.png?v=1643872426"
                title="green iguana"
            />
            <CardContent sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                <Typography gutterBottom variant="h5" component="div">
                    {props.group.vendor} - {props.group.option}
                </Typography>
                <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h6" component="div">
                        Price: $10
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Average Price: ${averagePrice}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", width: "100%", alignItems: "center", gap: "2.5rem", }}>
                    <Typography variant="h6" component="div">
                        Availability
                    </Typography>
                    {
                        isGroupInStock ? (
                            <Chip
                                icon={<CheckCircleOutlineIcon />}
                                label="In Stock!"
                                color="success"
                            />

                        ) : (
                            <Chip
                                icon={<SentimentVeryDissatisfiedIcon />}
                                label="OUT of Stock"
                                color="error"
                                variant="outlined"
                            />
                        )


                    }
                </Box>
                {/* <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography> */}
                <CardActions >
                    <Stack direction="row" sx={{ display: "flex", alignItems: "center", gap: ".5rem", justifyContent: "center" }}>
                        <Typography variant="h6" >Presentations</Typography>
                        {
                            props.group.variants.map((variant, idx) => (
                                <Button key={idx} variant="contained" size="small">{variant.option2}</Button>

                            ))
                        }

                    </Stack>
                </CardActions>
            </CardContent>
        </Card>
    );
}


export default DiaperCard