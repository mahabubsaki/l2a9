import React from 'react';
import { verifySession } from '../_libs/session';
import { redirect } from 'next/navigation';
import { Box, Link, Typography } from '@mui/material';
import { SIGN_IN_FIELDS, SIGN_IN_INITIAL_VALUES } from '../_constants';
import AuthForm from '../_components/AuthForm';
import NextJsLink from 'next/link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const LoginPage = async () => {
    const { isAuth } = await verifySession();
    if (isAuth) {
        redirect('/');
    }




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
                    <AuthForm isAuth={isAuth} type='sign-in' fields={SIGN_IN_FIELDS} initialValues={SIGN_IN_INITIAL_VALUES} />
                </Box>
            </Box>

            <Typography textAlign={'center'}>
                New to PristinePro? <Link component={NextJsLink} href={'/sign-up'}>Register</Link> Now!
            </Typography>
        </Box>
    );
};

export default LoginPage;