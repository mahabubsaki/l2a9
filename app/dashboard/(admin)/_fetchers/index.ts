import envConfig from "@/app/_configs/env.config";

const getProducts = async () => {
    const response = await fetch(envConfig.baseURL + '/products', {
        next: {
            tags: ['products']
        }
    });
    const json = await response.json();
    return json;
};

const getSingleProduct = async (id: string) => {
    const response = await fetch(envConfig.baseURL + '/product/' + id, {
        next: {
            tags: ['product', id]
        },
        cache: 'no-cache'
    });
    const json = await response.json();
    return json;
};

export {
    getProducts, getSingleProduct
};