import { Avatar, Button, Link, Tooltip } from '@mui/material';
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
    return <Tooltip title={user.name}>
        <Button>
            <Avatar alt={user.name} src="/images.png" />
        </Button>
    </Tooltip>

        ;
};

export default ToggleNavProfile;