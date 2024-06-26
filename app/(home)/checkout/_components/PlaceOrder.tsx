import { Button } from '@mui/material';
import React from 'react';

const PlaceOrder = ({ disabled, mutate, data }: { disabled: boolean, mutate: (d: any) => void, data: any; }) => {
    return (
        <Button disabled={disabled} onClick={() => mutate(data)} variant={'contained'}>Place Order</Button>
    );
};

export default PlaceOrder;