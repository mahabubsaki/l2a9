'use client';

import { Skeleton } from '@mui/material';
import cDynamic from 'next/dynamic';

const ReusableProdcutForm = cDynamic(() => import('../_components/ResuableProductForm'), {
    ssr: false,
    loading: () => {
        return <Skeleton width={'100%'} height={500} />;
    }
});






const AddProducts = () => {


    return (
        <ReusableProdcutForm type={'post'} />
    );
};

export default AddProducts;