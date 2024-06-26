'use client';
import { create } from 'zustand';


import { persist } from 'zustand/middleware';

const useStore = create(persist((set, get: any) => ({
    cart: [],
    addtoCart: (id: string) => set({ cart: [...get().cart, id] }),
    removeFromCart: (id: string) => set({ cart: get().cart.filter((i: string) => i !== id) }),
}), {
    name: 'cart-storage',
    getStorage: () => localStorage,
})
);
export default useStore;