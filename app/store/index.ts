'use client';
import { create } from 'zustand';


import { persist } from 'zustand/middleware';

const useStore = create(persist((set, get: any) => ({
    cart: [],
    addCart: (id: string) => {
        const cart = get().cart;
        if (!cart.find((item: any) => item.id === id)) {
            return set({ cart: [...cart, { id: id, quantity: 1 }] });
        }
        const index = cart.findIndex((item: any) => item.id === id);
        const newCart = [...cart];
        newCart[index].quantity += 1;
        set({ cart: newCart });


    },
    decreaseCart: (id: string) => {
        const cart = get().cart;
        const index = cart.findIndex((item: any) => item.id === id);
        const newCart = [...cart];
        newCart[index].quantity -= 1;
        if (newCart[index].quantity === 0) {
            newCart.splice(index, 1);
        }
        set({ cart: newCart });
    },
    removeCart: (id: string) => {
        const cart = get().cart;
        const index = cart.findIndex((item: any) => item.id === id);
        const newCart = [...cart];
        newCart.splice(index, 1);
        set({ cart: newCart });
    },
    clearCart: () => set({ cart: [] }),
}), {
    name: 'cart-storage',
    getStorage: () => localStorage,
})
);
export default useStore;