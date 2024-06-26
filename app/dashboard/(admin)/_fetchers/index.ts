import envConfig from "@/app/_configs/env.config";

const getProducts = async () => {
    if (!envConfig.baseURL) return null;
    const response = await fetch(envConfig.baseURL + '/products', {
        next: {
            tags: ['products']
        }
    });
    const json = await response.json();
    return json;
};



const getSingleProduct = async (id: string) => {
    if (!envConfig.baseURL) return null;
    try {
        const response = await fetch(envConfig.baseURL + '/product/' + id, {
            next: {
                tags: ['product', id]
            },
            cache: 'no-cache'
        });
        const json = await response.json();

        if (!json.success) return { error: true, message: json.message || 'Failed to sign in.' };;
        return json;
    } catch (err) {

        console.log(err);
        return { error: true, message: (err as Error).message || 'Failed to sign in.' };
    }
};

const getOrders = async () => {
    if (!envConfig.baseURL) return null;
    const response = await fetch(envConfig.baseURL + '/orders', {
        next: {
            tags: ['orders']
        }
    });
    const json = await response.json();
    if (!json.success) return { error: true, message: json.message || 'Failed to sign in.' };;
    return json;

};

export {
    getProducts, getSingleProduct, getOrders
};