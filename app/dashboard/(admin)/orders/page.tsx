import React from 'react';
import { getOrders } from '../_fetchers';
import { Box } from '@mui/material';
import OrderTable from '../_components/OrderTable';

const Orders = async () => {
    const data = await getOrders();
    const convertedRows = data.data.map((product: Record<string, any>) => ({
        id: product._id,
        orderDate: new Date(product.timestamp).toLocaleDateString(),
        status: product.status,
        email: product.user.email,
        name: product.user.name,
        totalCost: product.products.reduce((pre: any, cur: any) => pre + (cur.price * cur.quantity), 0),
        totalItem: product.products.reduce((pre: any, cur: any) => pre + cur.quantity, 0),
        rating: product.rating,
    }));


    return (
        <Box>
            <OrderTable role="admin" convertedRows={convertedRows} />
        </Box>
    );
};

export default Orders;