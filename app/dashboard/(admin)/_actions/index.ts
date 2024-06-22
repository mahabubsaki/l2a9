'use server';
import { deleteSession, verifySession } from "@/app/(auth)/_libs/session";
import envConfig from "@/app/_configs/env.config";

import { revalidateTag } from "next/cache";


const adminActionWrapper = (fn: Function) => {
    return async (...args: any[]) => {

        const { isAuth, role } = await verifySession();
        console.log({ isAuth, role });
        if (!isAuth || role !== 'admin') {
            throw new Error('Unauthorized');
        }
        return await fn(...args);

    };

};

const postProduct = adminActionWrapper(async (data: Record<string, any>, images: string[]) => {

    const { size, ...restData } = data;

    const formData = new FormData();
    for (const key in restData) {
        formData.append(key, restData[key]);
    }



    images.forEach((image: string) => {
        formData.append('image[]', image);

    });
    size.forEach((size: string) => {
        formData.append('size[]', size);
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



const deleteProduct = async (id: string) => {

};



export {
    postProduct,

    deleteProduct,

};