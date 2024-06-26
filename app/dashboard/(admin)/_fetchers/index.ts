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
    try {
        const response = await fetch(envConfig.baseURL + '/product/' + id, {
            next: {
                tags: ['product', id]
            },
            cache: 'no-cache'
        });
        const json = await response.json();

        if (!json.success) throw new Error(json.message || 'Failed to fetch product');
        return json;
    } catch (err) {


        throw new Error((err as Error)?.message || 'Failed to fetch product');
    }
};

const getOrders = async () => {
    const response = await fetch(envConfig.baseURL + '/orders', {
        next: {
            tags: ['orders']
        }
    });
    const json = await response.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch orders');
    return json;

};

export {
    getProducts, getSingleProduct, getOrders
};