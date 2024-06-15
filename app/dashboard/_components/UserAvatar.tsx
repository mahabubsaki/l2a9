import { Avatar, Button, Skeleton, Tooltip } from '@mui/material';
import React from 'react';

const UserAvatar = ({ user, isLoading }: { user: any, isLoading: boolean; }) => {
    if (isLoading) return <Button>
        <Skeleton variant='circular' animation='pulse' width={40} height={40} />
    </Button>;
    return (
        <Tooltip title={user.name}>
            <Button>
                <Avatar alt={user.name} src="/images.png" />
            </Button>

        </Tooltip>
    );
};

export default UserAvatar;