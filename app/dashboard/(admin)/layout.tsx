import { deleteSession, verifySession } from '@/app/(auth)/_libs/session';
import React from 'react';

const AdminDashboard = async ({ children }: { children: React.ReactNode; }) => {
    const { isAuth, role } = await verifySession();
    if (!isAuth || role !== 'admin') {
        return await deleteSession();
    }
    return (
        children
    );
};

export default AdminDashboard;