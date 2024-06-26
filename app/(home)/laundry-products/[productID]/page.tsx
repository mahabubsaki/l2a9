import { PRODUCT_ENUM } from '@/app/dashboard/(admin)/_constants';
import { getSingleProduct } from '@/app/dashboard/(admin)/_fetchers';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import Review from './_components/Review';
import AddToCartButton from '../_components/AddToCartButton';

const SingleProductPage = async ({ params }: { params: Record<string, any>; }) => {
    const { productID } = params;
    if (!productID) return notFound();
    const { data } = await getSingleProduct(productID);

    const { name, description, image, discount, category, price, stain, stock, type } = data || {};

    return (
        <Box mx={'auto'} maxWidth={1200}>
            <Grid container columns={12} >
                <Grid item>
                    <Box>
                        <Image alt={name} width={500} height={500} src={image?.[0]} />
                    </Box>
                </Grid>
                <Grid item>
                    <Box>
                        <Typography variant={'h3'}>{name}</Typography>
                        <Typography variant={'h6'}>{description}</Typography>

                        <Typography variant={'h6'}>Category : {PRODUCT_ENUM[category as keyof typeof PRODUCT_ENUM]}</Typography>
                        <Typography variant={'h6'}>Price: ${price}</Typography>
                        <Typography variant={'h6'}>Stock : {stock}</Typography>
                        <Typography variant={'h6'} textTransform={'capitalize'}>Type : {type}</Typography>
                    </Box>
                    <AddToCartButton id={productID} />
                </Grid>

            </Grid>
            <Suspense fallback={<Typography>Loading..</Typography>}>
                <Review productID={productID} />
            </Suspense>
        </Box>
    );
};

export default SingleProductPage;