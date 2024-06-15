import React from 'react';
import DashboardLayoutClient from './_components/DashboardLayoutClient';
import { verifySession } from '../(auth)/_libs/session';
import { redirect } from 'next/navigation';

const DashboardLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { isAuth, userId } = await verifySession();
    if (!isAuth) {
        redirect('/');
    }
    return (
        <DashboardLayoutClient userId={userId}>
            {children}
        </DashboardLayoutClient>
    );
};

export default DashboardLayout;