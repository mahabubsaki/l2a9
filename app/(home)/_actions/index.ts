'use server';

import { verifySession } from "@/app/(auth)/_libs/session";
import envConfig from "@/app/_configs/env.config";
import { revalidateTag } from "next/cache";

const userActionWrapper = (fn: Function) => {
    return async (...args: any[]) => {

        const { isAuth } = await verifySession();
        if (!isAuth) {
            throw new Error('Unauthorized');
        }
        return await fn(...args);

    };

};

const addReview = userActionWrapper(async (data: Record<string, any>) => {

    const response = await fetch(envConfig.baseURL + '/review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),

    });


    const json = await response.json();
    if (!json.success) throw new Error(json.message || 'Failed to add review');

    revalidateTag(data.productID);
    return json;
});

export {
    addReview
};