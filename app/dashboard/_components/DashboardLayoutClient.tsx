'use client';


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NextJsLink from 'next/link';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Button, Link, Skeleton, Tooltip } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAxiosSecure } from '@/app/_hooks/useAxiosSecure';
import envConfig from '@/app/_configs/env.config';
import dynamic from 'next/dynamic';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { deleteSession } from '@/app/(auth)/_libs/session';


const ThemeSwitch = dynamic(() => import('@/app/(home)/_components/ThemeSwitch'), {
    ssr: false, loading: () => {
        return <Button>
            <Skeleton variant='rectangular' animation='pulse' sx={{ borderRadius: 40 }} width={48} height={30} />
        </Button>;
    }
});

const SideBarRoutes = dynamic(() => import('./SideBarRoutes'), {
    ssr: false,
    loading: () => {
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
});
const Greetings = dynamic(() => import('./Greetings'), {
    ssr: false,
    loading: () => <Skeleton width={200} height={40} />
});
const UserAvatar = dynamic(() => import('./UserAvatar'), {
    ssr: false,
    loading: () => <Skeleton variant='circular' animation='pulse' width={40} height={40} />

});

const drawerWidth = 240;




export default function DashboardLayoutClient({
    children,
    userId
}: Readonly<{
    children: React.ReactNode;
    userId: string;
}>) {

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const initialData = queryClient.getQueryData(['user', userId]);
    const { data: user, isLoading } = useQuery({
        queryKey: ['user', userId],
        enabled: !initialData,
        queryFn: async () => {
            const { data } = await axiosSecure(`${envConfig.publicBaseURL}/user/${userId}`);

            return data.data;
        },
        initialData
    });

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    console.log({ isLoading });

    const drawer = (
        <Box >
            <Toolbar />
            <Divider />
            <List>
                <SideBarRoutes isLoading={isLoading} role={user?.role as 'admin' | 'user'} />
                <Link component={NextJsLink} href={'/'}>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <ListItemIcon>
                                <KeyboardBackspaceRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Back To Home'} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>

        </Box>
    );




    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
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
                    <Typography variant="h6" noWrap component="div" display={'flex'} gap={1} alignItems={'center'}>
                        <Greetings isLoading={isLoading} user={user} />
                    </Typography>
                    <Box ml='auto'>
                        <ThemeSwitch />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer

                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                    <Box mt='auto' mb={2}>
                        <List>
                            <ListItem sx={{ display: 'flex', justifyContent: 'center' }} disablePadding >
                                <UserAvatar isLoading={isLoading} user={user} />
                            </ListItem>

                            <ListItem disablePadding >
                                <ListItemButton disabled={isLoading} onClick={() => deleteSession()}>
                                    <ListItemIcon>
                                        <LogoutRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'LogOut'} />
                                </ListItemButton>
                            </ListItem>

                        </List>
                    </Box>
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                    <Box mt='auto' mb={2}>
                        <List>
                            <ListItem sx={{ display: 'flex', justifyContent: 'center' }} disablePadding >
                                <UserAvatar isLoading={isLoading} user={user} />
                            </ListItem>

                            <ListItem disablePadding >
                                <ListItemButton disabled={isLoading} onClick={() => deleteSession()}>
                                    <ListItemIcon>
                                        <LogoutRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'LogOut'} />
                                </ListItemButton>
                            </ListItem>

                        </List>
                    </Box>
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
