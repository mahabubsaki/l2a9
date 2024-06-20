'use server';
import envConfig from "@/app/_configs/env.config";
import { revalidateTag } from "next/cache";

const postProduct = async (data: Record<string, any>, images: string[]) => {
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
    const response = await fetch(envConfig.publicBaseURL + '/product', {
        method: 'POST',
        body: new URLSearchParams(formData as any),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const json = await response.json();
    if (!json.success) throw new Error(json.message || 'Failed to post product');
    revalidateTag('products');
    return json;

};



const deleteProduct = async (id: string) => {

};



export {
    postProduct,

    deleteProduct,

};