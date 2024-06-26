'use client';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Error = ({ error, reset }: {
    error: any;
    reset: any;
}) => {
    const router = useRouter();
    useEffect(() => {
        console.log();
    }, [error]);
    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={'100dvh'}>
            <Typography variant="h1">Error</Typography>
            <Typography variant="h3">{error.message}</Typography>
            <Stack spacing={3}>
                <Button variant='contained' onClick={() => {
                    router.back();
                }}>
                    Back
                </Button>
                <Button variant='contained' color='secondary' onClick={() => {
                    reset();
                }}>
                    Reset
                </Button>
            </Stack>
        </Box>
    );
};

export default Error;