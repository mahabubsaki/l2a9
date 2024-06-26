'use client';

import useStore from "@/app/store";
import { Button } from "@mui/material";
import { toast } from "sonner";


const AddToCartButton = ({ id }: { id: string; }) => {
    const addCart = useStore((state: any) => state.addCart);
    const cart = useStore((state: any) => state.cart);


    return (
        <Button onClick={() => addCart(id)} variant="contained" size="small">Add To Cart</Button>
    );
};

export default AddToCartButton;