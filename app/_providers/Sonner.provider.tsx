'use client';
import { useTheme } from '@mui/material';
import React from 'react';
import { Toaster } from 'sonner';

const SonnerProvider = ({ children }: { children: React.ReactNode; }) => {
    const theme = useTheme();
    return (
        <>
            <Toaster invert={theme.palette.mode === 'dark'} richColors position='top-center' expand />
            {children}
        </>
    );
};

export default SonnerProvider;