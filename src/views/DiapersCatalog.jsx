import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Loader from '../components/Loader';
import DiaperCard from '../components/DiaperCard';


const style = {
    mainContainer: {
        width: "95%",
        height: "95%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        height: "95%",
        width: "95%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    title: {
        height: "5%",
        width: "100%",
        paddingLeft: "1.5rem"
    },
    gridContainer: {
        height: "95%",
        width: "95%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "unset"
        // flexDirection: "column"
    },
    gridItem: {
        minWidth: "20%"
    }

}

const DiapersCatalog = () => {
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

        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        const { variants, image, vendor, presentationsBySizeInStock } = diapers;

        if (variants && variants.length > 0) {
            const groupArr = [];

            for (let i = 0; i < variants.length; i++) {
                const variant = variants[i];
                const { option1 } = variant;

                const existingGroupIndex = groupArr.findIndex(group => group.option === option1);
                // console.log("🚀 ~ existingGroupIndex:", existingGroupIndex)

                if (existingGroupIndex === -1) {
                    groupArr.push({ option: option1, variants: [variant], image, vendor, presentationsBySizeInStock });
                } else {
                    groupArr[existingGroupIndex].variants.push(variant);
                }
            }

            // console.log("🚀 ~ groupArr:", groupArr)

            setGroupedVariants(groupArr);
        }
    }, [diapers]);





    return (
        <Box sx={style.mainContainer}
        >
            {
                isLoading ? (
                    <Loader
                        loading={isLoading}
                    />
                ) : (
                    <Box
                        sx={style.container}

                    >
                        <Grid
                            sx={style.title}
                        >
                            {
                                groupedVariants && (
                                    <Typography variant='h5'>
                                        Total Results: {groupedVariants.length}
                                    </Typography>
                                )
                            }

                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            sx={style.gridContainer}
                        >
                            {groupedVariants.map((group, idx) => (
                                <Grid item key={idx} sx={style.gridItem}>
                                    <DiaperCard group={group} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )
            }
        </Box>
    );
};

export default DiapersCatalog;