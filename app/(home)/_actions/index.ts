'use server';

import { verifySession } from "@/app/(auth)/_libs/session";
import envConfig from "@/app/_configs/env.config";
import { revalidateTag } from "next/cache";

const userActionWrapper = (fn: Function) => {
    return async (...args: any[]) => {

        const { isAuth, userId } = await verifySession();
        if (!isAuth) {
            throw new Error('Unauthorized');
        }
        return await fn(...args, userId);

    };

};

const addReview = userActionWrapper(async (data: Record<string, any>, userId: string) => {

    const response = await fetch(envConfig.baseURL + '/review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, userID: userId }),

    });


    const json = await response.json();
    if (!json.success) throw new Error(json.message || 'Failed to add review');

    revalidateTag(data.productID);
    return json;
});

const checkout = userActionWrapper(async (data: Record<string, any>, userId: string) => {
    const response = await fetch(envConfig.baseURL + '/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data, userID: userId }),

    });
    const json = await response.json();
    if (!json.success) throw new Error(json.message || 'Failed to checkout');
    return json;
});

export {
    addReview,
    checkout
};