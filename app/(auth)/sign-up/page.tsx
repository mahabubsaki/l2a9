import { Box, Button, Typography, Link } from '@mui/material';
import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NextJsLink from 'next/link';
import AuthForm from '../_components/AuthForm';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';


const SignUp = () => {

    return (
        <Box sx={{
            minHeight: '100dvh',
            bgcolor: '#8EC5FC',
            backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',

        }}>
            <Link href={'/'} sx={{ textDecoration: 'none', color: 'black' }} component={NextJsLink}>
                <Box sx={{ p: 4 }}>
                    <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <KeyboardBackspaceIcon /> Back to Home
                    </Typography>
                </Box>
            </Link>
            <Box sx={{ width: 'clamp(350px,70%,90%)' }} margin={'auto'} >
                <Box display={'flex'} flexDirection={'column'} gap={1}>
                    <Typography variant='h4' textAlign={'center'}>Sign Up</Typography>
                    <Typography variant='body1' textAlign={'center'}>Create an account to get started</Typography>
                </Box>
                <Box>
                    <AuthForm type='sign-up' fields={['name']} initialValues={{ name: '' }} />
                </Box>
            </Box>

        </Box>
    );
};

export default SignUp;