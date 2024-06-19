'use client';
import { alpha, Box, Button, NoSsr, Skeleton, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import AppForm from '@/app/_components/Forms/AppForm';
import { ADD_PRODUCT_INITIAL_VALUES, PRODUCT_CATEGORY } from '../_constants';
import { addProductSchema } from '../_utils/schema';
import AppInput from '@/app/_components/Forms/AppInput';
import AppCheckBox from '@/app/_components/Forms/AppCheckBox';

import AppRadio from '@/app/_components/Forms/AppRadio';
import ImageUploadSection from '../_components/ImageUploadSection';
import AppSelect from '@/app/_components/Forms/AppSelect';
import { FieldValues } from 'react-hook-form';
import { postProduct } from '../_actions';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import envConfig from '@/app/_configs/env.config';
import { useAxiosPublic } from '@/app/_hooks/useAxiosPublic';




const AddProducts = () => {

    const formButtonRef = useRef<HTMLButtonElement | null>(null);
    const axiosPublic = useAxiosPublic();
    const { mutate, isPending } = useMutation({
        //@ts-ignore
        mutationFn: (data) => postProduct(data.body, data.images),
        onSuccess: (data) => {

            toast.success(data?.message || 'Product posted successfully');
        }, onError: (err) => {
            toast.error(err?.message || 'Failed to post product');
        }
    });
    const handleFormSubmit = async (data: FieldValues) => {


        const images = data.image;


        const imageFormData = new FormData();
        images.forEach((image: Record<string, any>) => {
            imageFormData.append(`files`, image.file);
        });

        const { data: response } = await axiosPublic.post(envConfig.publicBaseURL + '/upload', imageFormData, { headers: { 'Content-Type': 'multipart/form-data' } });;
        if (!response.success) return toast.error(response.message || 'Failed to upload images');

        const { image, ...rest } = data;

        //@ts-ignore
        mutate({
            body: rest,
            images: response.data
        });
    };

    return (
        <Box>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box>
                    <Typography variant='h5' display={'flex'} alignItems={'center'} gap={2}>
                        <RestoreFromTrashRoundedIcon fontSize={'medium'} /> Add New Product
                    </Typography>
                </Box>
                <Box>
                    <Button disabled={isPending} onClick={() => formButtonRef?.current?.click()} variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 1, borderRadius: 10 }} >
                        <DoneRoundedIcon /> Add Product
                    </Button>
                </Box>
            </Box>
            <AppForm initialValues={ADD_PRODUCT_INITIAL_VALUES} schema={addProductSchema} onSubmit={handleFormSubmit} sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
                <Box display={'flex'} gap={4}>
                    <Stack spacing={3} flex={5}>
                        <Box display={'flex'} flexDirection={'column'} gap={3} p={2}>
                            <Typography variant='h6'>General Information</Typography>
                            <Box >
                                <AppInput label='Product Name' name='name' />
                            </Box>
                            <Box>
                                <AppInput label='Product Description' textarea name='description' />
                            </Box>
                            <Stack direction={'row'} spacing={2}>
                                <Box>
                                    <Typography fontWeight={600}>Size</Typography>
                                    <Typography variant='caption' display={'inline-block'} mb={1}>Pick Available Size</Typography>
                                    <AppCheckBox fields={['xs', 's', 'm', 'l', 'xl', 'xxl']} name='size' />
                                </Box>
                                <Box>
                                    <Typography fontWeight={600}>Gender</Typography>
                                    <Typography variant='caption' display={'inline-block'} >Pick Gender</Typography>
                                    <Box mt={0.5}>
                                        <AppRadio fields={['male', 'female']} name={'gender'} />
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>
                        <Stack spacing={3} p={2}>
                            <Typography variant='h6'>Pricing and Stock</Typography>
                            <Stack direction={'row'} spacing={2}>
                                <Box flex={1}>
                                    <AppInput start='$' type='number' name='price' label='Base Pricng' />
                                </Box>
                                <Box flex={1} >
                                    <AppInput name='stock' type='number' label='Stock' />
                                </Box>
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <Box flex={1}>
                                    <AppInput end='%' type='number' name='discount' label='Discount' />
                                </Box>
                                <Box flex={1} >
                                    <AppInput name='discountType' label='Discount Type' />
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack flex={3} spacing={3}>
                        <ImageUploadSection name='image' />
                        <Box>
                            <Typography mb={2} variant='h6'>General Information</Typography>
                            <Box width={'100%'}>
                                <AppSelect label='Product Category' menuItem={PRODUCT_CATEGORY} name='category' />
                            </Box>
                        </Box>
                    </Stack>
                </Box>
                <Button type='submit' sx={{ display: 'none' }} ref={formButtonRef}></Button>
            </AppForm>

        </Box>
    );
};

export default AddProducts;