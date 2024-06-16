'use client';
import { Box, Button, Typography } from '@mui/material';
import React, { useRef } from 'react';
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import AppForm from '@/app/_components/Forms/AppForm';

const AddProducts = () => {
    const formButtonRef = useRef(null);
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
            <AppForm >

            </AppForm>

        </Box>
    );
};

export default AddProducts;