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
export {
    getProducts
};