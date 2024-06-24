import React from 'react';

import { getProducts } from '../_fetchers';
import { Box } from '@mui/material';
import ProductTable from '../_components/ProductTable';



const Products = async () => {
    const products = await getProducts();

    const convertedRows = products.data.map((product: Record<string, any>) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        discount: product.discount,
        discountType: product.discountType,
        category: product.category,
        stain: product.stain,
        action: product._id,
        type: product.type,
    }));
    return (
        <Box>
            <ProductTable convertedRows={convertedRows} />
        </Box>
    );
};

export default Products;