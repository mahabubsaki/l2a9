'use client';
import { Badge } from '@mui/material';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useStore from '@/app/store';

const CartCount = () => {
    const count = useStore((state: any) => state.cart).reduce((acc: any, curr: any) => acc + curr.quantity, 0);

    return (
        <Badge badgeContent={count} color='secondary' >
            <ShoppingCartIcon />
        </Badge>
    );
};

export default CartCount;