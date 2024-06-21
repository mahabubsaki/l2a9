
import React from 'react';
import { getSingleProduct } from '../../_fetchers';
import cDynamic from 'next/dynamic';
import { Skeleton } from '@mui/material';
// import ResuableProductForm from '../../_components/ResuableProductForm';
const ReusableProdcutForm = cDynamic(() => import('../../_components/ResuableProductForm'), {
    ssr: false,
    loading: () => {
        return <Skeleton width={'100%'} height={500} />;
    }
});

export const dynamic = 'force-dynamic';

const UpdateProductPage = async ({ params }: { params: Record<string, any>; }) => {
    const product = await getSingleProduct(params.productID);


    return (
        <ReusableProdcutForm defaults={product.data} type='put' />
    );
};

export default UpdateProductPage;