'use client';

import useStore from "@/app/store";
import { Button } from "@mui/material";
import { toast } from "sonner";


const AddToCartButton = ({ id }: { id: string; }) => {
    const addToCart = useStore((state: any) => state.addtoCart);
    const cart = useStore((state: any) => state.cart);


    return (
        <Button onClick={() => {


            if (cart.includes(id)) {
                toast.error('Item already in cart');
            } else {
                addToCart(id);
                toast.success('Item added to cart');
            }
        }} variant="contained" size="small">Add To Cart</Button>
    );
};

export default AddToCartButton;