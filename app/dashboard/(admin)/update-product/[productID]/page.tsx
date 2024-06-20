
import React from 'react';
import { getSingleProduct } from '../../_fetchers';
import ResuableProductForm from '../../_components/ResuableProductForm';

export const dynamic = 'force-dynamic';

const UpdateProductPage = async ({ params }: { params: Record<string, any>; }) => {
    const product = await getSingleProduct(params.productID);


    return (
        <ResuableProductForm defaults={product.data} type='put' />
    );
};

export default UpdateProductPage;