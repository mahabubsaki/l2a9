import React from 'react';
import { ADMIN_ROUTES, USER_ROUTES } from '../_constants';
import { Link, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material';
import NextJsLink from 'next/link';
import { usePathname } from 'next/navigation';



const SideBarRoutes = ({ role, isLoading }: { role: 'admin' | 'user'; isLoading: boolean; }) => {

    const routes = role === 'admin' ? ADMIN_ROUTES : USER_ROUTES;
    const pathName = usePathname();

    if (isLoading) {
        return <>
            {
                new Array(4).fill(0).map((_, index) => {
                    return <ListItem key={index} disablePadding >
                        <ListItemButton>
                            <Skeleton width={'100%'} height={40} />
                        </ListItemButton>
                    </ListItem>;

                })
            }
        </>;
    }
    return routes.map(({ icon, name, url }) => <Link component={NextJsLink} key={name} href={url} >
        <ListItem disablePadding >
            <ListItemButton selected={url === pathName}  >
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItemButton>
        </ListItem></Link>);
};

export default SideBarRoutes;