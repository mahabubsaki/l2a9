import { getProducts } from '@/app/dashboard/(admin)/_fetchers';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LanudryProducts = async () => {
    const { data } = await getProducts();
    console.log(data);
    return (
        <Box sx={{ width: '100%', my: 10 }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    data.map((product: Record<string, any>) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                <Card >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            aspectRatio: '16/9',
                                        }}

                                    >
                                        <Image fill src={product.image[0]} alt={product.name} />
                                    </Box>


                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                        <Stack>
                                            <Typography variant="body2" color="text.secondary">
                                                Price: {product.price}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Stock: {product.stock}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Add To Cart</Button>
                                        <Link href={`/laundry-products/${product._id}`}>
                                            <Button size="small">Details</Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
};

export default LanudryProducts;