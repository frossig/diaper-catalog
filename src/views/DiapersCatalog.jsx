import { Box, Grid, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Loader from '../components/Loader';
import DiaperCard from '../components/DiaperCard';

const DiapersCatalog = () => {
    const theme = useTheme()
    const [isLoading, setIsLoading] = useState(false);
    const [diapers, setDiapers] = useState([]);
    const [groupedVariants, setGroupedVariants] = useState([]);


    const url = 'https://kabsa.yallababy.com/api/v1/products/best-selling-products-by-subcategory';
    const headers = {
        'secretKey': process.env.REACT_APP_API_KEY
    };

    useLayoutEffect(() => {
        setIsLoading(true);
        axios.get(url, { headers })
            .then(({ data }) => {
                const diaperProduct = data.find(item => item.product_type === 'diapers');
                setDiapers(diaperProduct);
            })
            .catch((err) => console.error("ERROR: ", err))
            .finally(() => setIsLoading(false))

    }, []);

    // useEffect(() => {
    //     const { variants } = diapers;
    //     // console.log("🚀 ~ variants:", variants);

    //     if (variants && variants.length > 0) {
    //         const groupArr = [];

    //         for (let i = 0; i < variants.length; i++) {
    //             const variant = variants[i];
    //             const { option1 } = variant;

    //             if (!groupArr[option1]) {
    //                 groupArr[option1] = [];
    //             }
    //             groupArr[option1].push(variant);
    //         }
    //         setGroupedVariants(groupArr)

    //     }
    // }, [diapers]);

    useEffect(() => {
        const { variants, image, vendor, presentationsBySizeInStock } = diapers;
        console.log("🚀 ~ diapers:", diapers)

        if (variants && variants.length > 0) {
            const groupArr = [];


            for (let i = 0; i < variants.length; i++) {
                const variant = variants[i];
                const { option1 } = variant;

                // Buscar si ya existe un grupo con la opción actual
                const existingGroupIndex = groupArr.findIndex(group => group.option === option1);

                if (existingGroupIndex === -1) {
                    // Si no existe, crear un nuevo grupo
                    groupArr.push({ option: option1, variants: [variant], image, vendor, presentationsBySizeInStock });
                } else {
                    // Si existe, agregar la variante al grupo existente
                    groupArr[existingGroupIndex].variants.push(variant);
                }
            }

            console.log("🚀 ~ groupArr:", groupArr)

            setGroupedVariants(groupArr);
        }
    }, [diapers]);





    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: theme.palette.primary.dark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
        >
            {
                isLoading ? (
                    <Loader
                        loading={isLoading}
                    />
                ) : (
                    <Grid container spacing={2} justifyContent="center">
                        {groupedVariants.map((group, idx) => (
                            <Grid item key={idx}>
                                <DiaperCard group={group} />
                            </Grid>
                        ))}
                    </Grid>
                )
            }
        </Box>
    );
};

export default DiapersCatalog;