import { Skeleton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import timeGreetings from '../_utils/timeGreetings';

const Greetings = ({ user, isLoading }: { user: any; isLoading: boolean; }) => {
    if (isLoading) <Skeleton width={200} height={40} />;
    return (
        <Typography variant="h6" noWrap component="div" display={'flex'} gap={1} alignItems={'center'}>
            {timeGreetings()}, {user?.name} {user?.role === 'admin' && <Tooltip title='Admin'>
                <VerifiedRoundedIcon /></Tooltip>}
        </Typography>
    );
};

export default Greetings;