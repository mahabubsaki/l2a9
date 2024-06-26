import React from 'react';

import { getMyOrders } from '@/app/(home)/_actions';
import { Box } from '@mui/material';
import OrderTable from '../../(admin)/_components/OrderTable';

const MyOrders = async () => {
    const data = await getMyOrders();
    console.log(data);
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
    console.log(convertedRows);
    return (
        <Box>
            <OrderTable role="member" convertedRows={convertedRows} />
        </Box>
    );
};

export default MyOrders;