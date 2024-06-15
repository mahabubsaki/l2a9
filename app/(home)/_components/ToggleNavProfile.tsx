import { deleteSession } from '@/app/(auth)/_libs/session';
import { Avatar, Button, Tooltip, Typography } from '@mui/material';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Link from 'next/link';

type ToggleNavProfileProps = {
    handleDrawerToggle: () => void,
    user: Record<string, any> | null;
};

const ToggleNavProfile = ({ handleDrawerToggle, user }: ToggleNavProfileProps) => {
    if (!user) {
        return <Link href={'/sign-up'}>
            <Button onClick={handleDrawerToggle} variant='contained'>
                Join Now
            </Button>
        </Link>;
    }
    return <>
        <Tooltip title={user.name}>
            <Button>
                <Avatar alt={user.name} src="/images.png" />
            </Button>

        </Tooltip>
        <Button onClick={() => deleteSession()} variant='outlined' color='secondary'>
            <Typography>
                Logout
            </Typography>
        </Button>
        {user.role === 'admin' ? <Tooltip title="Dashboard">
            <Link href='/dashboard'>
                <Button>
                    <DashboardIcon color='secondary' />
                </Button></Link>
        </Tooltip> : null}
    </>

        ;
};

export default ToggleNavProfile;