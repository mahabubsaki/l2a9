import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import ImageIcon from '@mui/icons-material/Image';
import 'swiper/css/navigation';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


const ImageUploadSection = ({ name }: { name: string; }) => {
    const { control } = useFormContext();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {

                return <Stack sx={{ userSelect: 'none' }} spacing={3} overflow={'hidden'} >
                    <Stack p={2} spacing={2} >
                        <Typography variant='h6'>Product Image</Typography>

                        <Stack >
                            <Box maxWidth={300} sx={{ aspectRatio: '16/16', transform: 'translateX(-50%)', left: '50%', right: '50%', borderStyle: 'dotted' }} position={'relative'} borderRadius={2} overflow={'hidden'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                {
                                    field?.value?.length > 0 ? <Image alt={'not-found-image'} fill src={selectedImage!} /> : <Stack spacing={1}>
                                        <Typography color={'error'} fontWeight={600}>No Image Selected</Typography>
                                        <Box display={'flex'} justifyContent={'center'}>
                                            <ImageIcon fontSize={'large'} />
                                        </Box>
                                    </Stack>
                                }
                            </Box>
                        </Stack>
                        <Box display={'flex'}>
                            <Box flex={3} overflow={'hidden'} pl={3} pr={2.5} position={'relative'}>

                                {field.value?.length > 3 ? <>
                                    <NavigateBeforeIcon aria-disabled onClick={() => {
                                        swiperRef?.slidePrev();
                                    }} sx={{
                                        position: 'absolute', left: -8, top: '50%', bottom: '50%', transform: 'translateY(-50%)', cursor: 'pointer',


                                        '&:hover': {
                                            color: 'primary.main'
                                        }
                                    }} />
                                    <NavigateNextIcon onClick={() => {
                                        swiperRef?.slideNext();

                                    }} sx={{
                                        position: 'absolute', right: 0, top: '50%', bottom: '50%', transform: 'translateY(-50%)', cursor: 'pointer',

                                        '&:hover': {
                                            color: 'primary.main'
                                        }
                                    }} />
                                </>

                                    : null}
                                <Swiper

                                    //@ts-ignore
                                    ref={swiperRef}

                                    slidesPerView={3}
                                    onSwiper={setSwiperRef}
                                >
                                    {field.value?.length ? field.value.map((image: Record<string, any>, index: number) => {
                                        return <SwiperSlide key={index}>
                                            <Box onClick={() => {
                                                setSelectedImage(image.url);
                                            }} sx={{ aspectRatio: '16/16', overflow: 'hidden', width: 80, borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', border: image.url === selectedImage ? 1 : 0, cursor: 'pointer', borderColor: 'blue' }}>
                                                <Image alt={'image' + index} fill src={image.url} />
                                                <DeleteIcon color='primary' onClick={(e) => {
                                                    const rest = field.value.filter((item: Record<string, any>) => item.url !== image.url);
                                                    field.onChange(rest);
                                                    if (selectedImage === image.url) {
                                                        setSelectedImage(null);
                                                    }
                                                    if (rest.length) setSelectedImage(rest[0].url);
                                                    e.stopPropagation();
                                                }} fontSize='small' sx={{
                                                    position: 'absolute', top: 0, right: 0,
                                                    '&:hover': {
                                                        color: 'error.main'
                                                    },



                                                }} />
                                            </Box>
                                        </SwiperSlide>;
                                    }) : null}

                                </Swiper>
                            </Box>
                            {field.value?.length === 3 ? null : <Box flex={1}>

                                <Box sx={{ aspectRatio: '16/16', width: 80, borderRadius: 2, borderStyle: 'dashed', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', }}>
                                    <input type='file' onChange={(e) => {
                                        const file = e?.target?.files?.[0];

                                        if (!file) return;
                                        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
                                        if (!allowedTypes.includes(file.type)) {
                                            toast.error('Invalid file type, Allowed types are png, jpeg, jpg, svg');
                                            return;
                                        }
                                        const url = URL.createObjectURL(file);
                                        field.onChange([...field.value, { url, file }]);
                                        if (field.value?.length === 0) {
                                            setSelectedImage(url);
                                        }
                                        e.target.value = '';
                                    }} style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, opacity: 0, cursor: 'pointer' }} />
                                    <  AddCircleIcon />
                                </Box>
                            </Box>}
                        </Box>
                        <Typography color={'error'} variant='subtitle2'>{error?.message}</Typography>
                    </Stack>

                </Stack>;
            }}
        />
    );
};

export default ImageUploadSection;