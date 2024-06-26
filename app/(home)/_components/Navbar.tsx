'use client';
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Badge, Skeleton } from '@mui/material';
import { drawerWidth, navItems } from '../_constants';
import dynamic from 'next/dynamic';
import { Link } from '@mui/material';
import NextLink from 'next/link';
import { verifySession } from '@/app/(auth)/_libs/session';
import { useQueryClient } from '@tanstack/react-query';
import envConfig from '@/app/_configs/env.config';
import { useAxiosSecure } from '@/app/_hooks/useAxiosSecure';

const CartCount = dynamic(() => import('./CartCount'), {
    ssr: false
});

const ThemeSwitch = dynamic(() => import('../_components/ThemeSwitch'), {
    ssr: false, loading: () => {
        return <Button>
            <Skeleton variant='rectangular' animation='pulse' sx={{ borderRadius: 40 }} width={48} height={30} />
        </Button>;
    }
});
const ToggleNavProfile = dynamic(() => import('./ToggleNavProfile'), {
    ssr: false, loading: () => {
        return <Button>
            <Skeleton variant='circular' animation='pulse' width={40} height={40} />
        </Button>;

    }
});


interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}


export default function Navbar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setUser] = useState(null);
    const qeuryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        (async function () {
            const { isAuth, userId } = await verifySession();

            if (isAuth) {

                try {
                    const data = await qeuryClient.fetchQuery({
                        queryKey: ['user', userId],

                        queryFn: async () => {
                            const { data } = await axiosSecure(`${envConfig.publicBaseURL}/user/${userId}`);


                            return data?.data;
                        },
                        staleTime: Infinity



                    });
                    setUser(data);
                } catch (err) {
                    console.log(err);
                }


            }
        })();
    }, []);



    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };


    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                PristinePro
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <Link key={item.name} href={item.path} component={NextLink}>
                        <ListItem disablePadding onClick={handleDrawerToggle}>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem></Link>
                ))}
                <ListItem disablePadding>
                    <ListItemButton onClick={handleDrawerToggle} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CartCount />
                    </ListItemButton>

                </ListItem>

                <ThemeSwitch />
                <Link href={'/sign-up'}>
                    <Button onClick={handleDrawerToggle} variant='contained'>
                        Join Now
                    </Button>
                </Link>
                {/* <ThemeSwitch /> */}



            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>

            <AppBar component="nav"  >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        PristinePro
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.path} component={NextLink}>
                                <Button sx={{ color: '#fff' }}>
                                    {item.name}
                                </Button></Link>
                        ))}
                        <Button sx={{ color: '#fff' }}>
                            <CartCount />
                        </Button>
                        <ThemeSwitch />
                        <ToggleNavProfile handleDrawerToggle={handleDrawerToggle} user={user} />

                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 4 }}>

            </Box>
        </Box>
    );
}
