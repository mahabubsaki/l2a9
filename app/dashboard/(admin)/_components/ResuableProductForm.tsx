'use client';
import { alpha, Box, Button, NoSsr, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
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
import { useMutation, } from '@tanstack/react-query';
import envConfig from '@/app/_configs/env.config';

import { useAxiosSecure } from '@/app/_hooks/useAxiosSecure';
import { deleteSession } from '@/app/(auth)/_libs/session';



const ResuableProductForm = ({ type, defaults, id }: { type: 'post' | 'put'; defaults?: Record<string, any>; id?: string; }) => {

    const formButtonRef = useRef<HTMLButtonElement | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (loading) {
            toast.loading('Processing Data', {
                id: 'uploading'
            });
        } else {
            toast.dismiss('uploading');

        }
    }, [loading]);
    const axiosSecure = useAxiosSecure();
    const { mutate, isPending } = useMutation({
        //@ts-ignore
        mutationFn: (data) => postProduct(data.body, data.images),
        mutationKey: [type === 'post' ? 'postProduct' : 'putProduct'],
        onSuccess: (data) => {

            toast.success(data?.message || `Product ${type == 'post' ? 'posted' : 'updated'} successfully`);
        }, onError: (err) => {
            toast.error(err?.message || `Failed to ${type == 'post' ? 'post' : 'update'} product`);
            if (err?.message === 'Unauthorized') {

                deleteSession();
            }
        }
    });
    const handleFormSubmit = async (data: FieldValues) => {

        setLoading(true);
        const images = data.image;
        const cloudineryImagesDeleted = images.filter((image: Record<string, any>) => image.url.includes('cloudinary') && !!image.deleted);
        const localImages = images.filter((image: Record<string, any>) => !image.url.includes('cloudinary') && !image.deleted);
        console.log(cloudineryImagesDeleted, localImages);
        const cloudineryImages = images.filter((image: Record<string, any>) => image.url.includes('cloudinary') && !image.deleted);

        const imageFormData = new FormData();
        localImages.forEach((image: Record<string, any>) => {
            imageFormData.append(`files`, image.file);
        });
        if (cloudineryImagesDeleted.length > 0) {
            try {
                const { data: response } = await axiosSecure.delete(envConfig.publicBaseURL + '/deleteImage', {
                    data: {
                        images: cloudineryImagesDeleted.map((image: Record<string, any>) => image.url)
                    }
                });
                if (!response.success) return toast.error(response.message || 'Failed to delete images');
            } catch (err) {
                console.log(err);
            }
        }

        const { data: response } = await axiosSecure.post(envConfig.publicBaseURL + '/upload', imageFormData, { headers: { 'Content-Type': 'multipart/form-data' } });;
        if (!response.success) return toast.error(response.message || 'Failed to upload images');

        const { image, ...rest } = data;
        setLoading(false);
        //@ts-ignore
        mutate({
            body: { ...rest, id },
            images: [...response.data, ...cloudineryImages.map((image: Record<string, any>) => image.url)]
        });
    };

    return (
        <Box>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box>
                    <Typography variant='h5' display={'flex'} alignItems={'center'} gap={2}>
                        <RestoreFromTrashRoundedIcon fontSize={'medium'} /> {type === 'post' ? 'Add New' : 'Update'} Product
                    </Typography>
                </Box>
                <Box>
                    <Button disabled={isPending} onClick={() => {

                        formButtonRef?.current?.click();
                    }} variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 1, borderRadius: 10 }} >
                        <DoneRoundedIcon /> {type === 'post' ? 'Add' : 'Update'} Product
                    </Button>
                </Box>
            </Box>
            <AppForm initialValues={defaults ? {
                ...defaults, image: defaults.image.map((image: string) => {
                    return { url: image, file: new File([], 'demo.jpg'), type, deleted: false };
                })
            } : ADD_PRODUCT_INITIAL_VALUES} schema={addProductSchema} onSubmit={handleFormSubmit} sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
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
                        <ImageUploadSection images={defaults?.image} name='image' />
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

export default ResuableProductForm;