import React from 'react';
import { verifySession } from './_libs/session';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }: { children: React.ReactNode; }) => {

    return (
        children
    );
};

export default AuthLayout;