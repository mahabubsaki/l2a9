'use client';
import { useAxiosSecure } from '@/app/_hooks/useAxiosSecure';
import useStore from '@/app/store';
import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Skeleton, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Image from 'next/image';
import { checkout } from '../_actions';
import { toast } from 'sonner';

import dynamic from 'next/dynamic';
const PlaceOrder = dynamic(() => import('./_components/PlaceOrder'), {
    ssr: false,
    loading: () => {
        return <Skeleton width={200} height={50} />;
    }
});

const Checkout = () => {
    const cart = useStore((state: any) => state.cart);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const decreaseCart = useStore((state: any) => state.decreaseCart);
    const removeCart = useStore((state: any) => state.removeCart);
    const addCart = useStore((state: any) => state.addCart);

    const clearCart = useStore((state: any) => state.clearCart);
    const { data } = useQuery({
        queryKey: ['cart', cart.map((item: any) => item.id).join('-')],
        queryFn: async () => {
            const { data } = await axiosSecure.post('/cart', {
                data: cart,
            });
            return data.data;
        },
        initialData: []
    });
    console.log(data);
    const { mutate, isPending } = useMutation({
        mutationKey: ['place-order'],
        mutationFn: checkout,
        onError: (err) => {
            console.log(err);
            toast.error(err?.message || 'Failed to place order');
        },
        onSuccess: (data) => {
            toast.success(data?.message || 'Order placed successfully');
            clearCart();
        }
    });


    return (
        <Box maxWidth={1200} mx={'auto'}>
            <Typography variant={'h4'}>Checkout</Typography>
            <Box>
                <Typography variant={'h5'}>Total {data.reduce((pre: any, cur: any) => pre + cur.quantity, 0)} Items</Typography>
                <Box>
                    <Typography variant={'h6'}>Total Amount : ${data.reduce((pre: any, cur: any) => pre + (cur.price * cur.quantity), 0)}</Typography>
                </Box>
            </Box>
            <Stack direction={'row'} spacing={5}>
                <Box flex={1}>
                    {data.map((item: any) => {
                        return (
                            <Box key={item._id} maxWidth={400} p={3} borderRadius={2} bgcolor={'ButtonHighlight'} my={2}>
                                <Box position={'relative'} width={'100%'} sx={{ aspectRatio: '16/9' }}>
                                    <Image alt={item.name} fill src={item.image?.[0]} />
                                </Box>
                                <Typography variant='h5'>{item.name}</Typography>
                                <Typography variant='h6' display={'flex'} alignItems={'center'} gap={2}>Quantity : <IconButton onClick={() => {
                                    addCart(item._id);
                                    queryClient.invalidateQueries({
                                        queryKey: ['cart']
                                    });
                                }}>
                                    <AddCircleOutlineIcon /></IconButton> {item.quantity} <IconButton onClick={() => {
                                        decreaseCart(item._id);
                                        queryClient.invalidateQueries({
                                            queryKey: ['cart']
                                        });
                                    }}>
                                        <RemoveCircleOutlineIcon /></IconButton></Typography>
                                <Typography variant='h6'>Price : ${item.price}</Typography>
                                <Typography variant='h6'>Total : ${item.price * item.quantity}</Typography>
                                <Button onClick={() => {
                                    removeCart(item._id);
                                    queryClient.invalidateQueries({
                                        queryKey: ['cart']
                                    });
                                }} variant={'contained'} color='error'>Remove</Button>
                            </Box>
                        );
                    })}
                </Box>
                <Box flex={1} >

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Payment Method</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="cash-on-delivery"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="cash-on-delivery" control={<Radio />} label="Cash On Delivery" />
                            <FormControlLabel value="bkash" control={<Radio />} label="Bkash" />
                            <FormControlLabel value="nagad" control={<Radio />} label="Nagad" />
                        </RadioGroup>
                    </FormControl>


                    <Box display={'flex'} justifyContent={'end'} >
                        <PlaceOrder data={data} disabled={isPending || !cart.length} mutate={mutate} />

                    </Box>
                </Box>

            </Stack>
        </Box>
    );
};

export default Checkout;