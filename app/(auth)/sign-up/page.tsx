import { Box, Button, Typography, Link } from '@mui/material';
import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NextJsLink from 'next/link';
import AuthForm from '../_components/AuthForm';
import { SIGN_UP_FIELDS, SIGN_UP_INITIAL_VALUES } from '../_constants';


const SignUp = () => {

    return (
        <Box sx={{
            minHeight: '100dvh',
            bgcolor: '#8EC5FC',
            backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',

        }}>

            <Box sx={{ p: 4 }}>
                <Link href={'/'} sx={{ textDecoration: 'none', color: 'black', display: 'inline-block' }} component={NextJsLink}>
                    <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <KeyboardBackspaceIcon /> Back to Home
                    </Typography>
                </Link>
            </Box>

            <Box sx={{ width: 'clamp(350px,70%,90%)' }} margin={'auto'} >
                <Box display={'flex'} flexDirection={'column'} gap={1}>
                    <Typography variant='h4' textAlign={'center'}>Sign Up</Typography>
                    <Typography variant='body1' textAlign={'center'}>Create an account to get started</Typography>
                </Box>
                <Box>
                    <AuthForm type='sign-up' fields={SIGN_UP_FIELDS} initialValues={SIGN_UP_INITIAL_VALUES} />
                </Box>
            </Box>

        </Box>
    );
};

export default SignUp;