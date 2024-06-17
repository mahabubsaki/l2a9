'use client';
import { alpha, Box, Button, NoSsr, Skeleton, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import AppForm from '@/app/_components/Forms/AppForm';
import { ADD_PRODUCT_INITIAL_VALUES } from '../_constants';
import { addProductSchema } from '../_utils/schema';
import AppInput from '@/app/_components/Forms/AppInput';
import AppCheckBox from '@/app/_components/Forms/AppCheckBox';

import AppRadio from '@/app/_components/Forms/AppRadio';
import ImageUploadSection from '../_components/ImageUploadSection';




const AddProducts = () => {
    const formButtonRef = useRef<HTMLButtonElement | null>(null);
    const handleFormSubmit = () => {

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
                    <Button onClick={() => formButtonRef?.current?.click()} variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 1, borderRadius: 10 }} >
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
                                    <AppInput name='stock' label='Stock' />
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
                    <ImageUploadSection name='image' />
                </Box>
                <Button type='submit' sx={{ display: 'none' }} ref={formButtonRef}></Button>
            </AppForm>

        </Box>
    );
};

export default AddProducts;