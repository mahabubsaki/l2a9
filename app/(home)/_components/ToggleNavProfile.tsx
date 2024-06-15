import { deleteSession } from '@/app/(auth)/_libs/session';
import { Avatar, Button, Link, Tooltip, Typography } from '@mui/material';
import React from 'react';

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
    </>

        ;
};

export default ToggleNavProfile;