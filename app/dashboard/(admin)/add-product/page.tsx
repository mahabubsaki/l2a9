'use client';
import { alpha, Box, Button, Typography } from '@mui/material';
import React, { useRef } from 'react';
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import AppForm from '@/app/_components/Forms/AppForm';
import { ADD_PRODUCT_INITIAL_VALUES } from '../_constants';
import { addProductSchema } from '../_utils/schema';
import AppInput from '@/app/_components/Forms/AppInput';
import AppCheckBox from '@/app/_components/Forms/AppCheckBox';

const AddProducts = () => {
    const formButtonRef = useRef(null);
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
                    <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 1, borderRadius: 10 }} >
                        <DoneRoundedIcon /> Add Product
                    </Button>
                </Box>
            </Box>
            <AppForm initialValues={ADD_PRODUCT_INITIAL_VALUES} schema={addProductSchema} onSubmit={handleFormSubmit} sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
                <Box display={'flex'} gap={4}>
                    <Box flex={5} display={'flex'} flexDirection={'column'} gap={3}>
                        <Typography variant='h6'>General Information</Typography>
                        <Box >
                            <AppInput label='Product Name' name='name' />
                        </Box>
                        <Box>
                            <AppInput label='Product Description' textarea name='description' />
                        </Box>
                        <Box>
                            <AppCheckBox fields={['xs']} name='size' />
                        </Box>
                    </Box>
                    <Box flex={3} >
                        <Typography>s</Typography>
                    </Box>
                </Box>
            </AppForm>

        </Box>
    );
};

export default AddProducts;