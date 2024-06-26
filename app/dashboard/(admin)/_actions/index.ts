'use server';
import { verifySession } from "@/app/(auth)/_libs/session";
import envConfig from "@/app/_configs/env.config";

import { revalidateTag } from "next/cache";


const adminActionWrapper = (fn: Function) => {
    return async (...args: any[]) => {

        const { isAuth, role } = await verifySession();
        if (!isAuth || role !== 'admin') {
            throw new Error('Unauthorized');
        }
        return await fn(...args);

    };

};
const userActionWrapper = (fn: Function) => {
    return async (...args: any[]) => {

        const { isAuth, userId } = await verifySession();
        if (!isAuth) {
            throw new Error('Unauthorized');
        }
        return await fn(...args, userId);

    };

};

const postProduct = adminActionWrapper(async (data: Record<string, any>, images: string[]) => {

    const { stain, ...restData } = data;

    const formData = new FormData();
    for (const key in restData) {
        formData.append(key, restData[key]);
    }



    images.forEach((image: string) => {
        formData.append('image[]', image);

    });
    stain.forEach((size: string) => {
        formData.append('stain[]', size);
    });
    const response = await fetch(envConfig.publicBaseURL + `/product/${data.id}`, {
        method: 'PUT',
        body: new URLSearchParams(formData as any),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const json = await response.json();
    if (!json.success) throw new Error(json.message || 'Failed to post product');
    revalidateTag('products');
    return json;

});



const deleteProduct = adminActionWrapper(async (id: string) => {

    try {
        const response = await fetch(envConfig.baseURL + `/product/${id}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        if (!json.success) new Error(json.message || 'Failed to delete product');
        revalidateTag('products');
        return 'Product deleted successfully';
    } catch (err) {
        console.log(err);

        throw new Error((err as Error).message);
    }

});


const deliverOrder = userActionWrapper(async (data: Record<string, any>) => {

    const { id, ...rest } = data;
    console.log(rest);
    try {
        const response = await fetch(envConfig.baseURL + `/order/${id}`, {
            method: 'PUT',
            body: JSON.stringify(rest),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        if (!json.success) new Error(json.message || 'Failed to deliver order');
        revalidateTag('orders');
        return 'Order delivered successfully';
    } catch (err) {
        console.log(err);

        throw new Error((err as Error).message);
    }
});



export {
    postProduct,

    deleteProduct,
    deliverOrder
};