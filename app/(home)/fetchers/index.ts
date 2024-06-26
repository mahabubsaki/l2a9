import envConfig from "@/app/_configs/env.config";

const getReviews = async (id: string) => {
    const response = await fetch(envConfig.baseURL + '/reviews/' + id, {
        next: {
            tags: ['reviews', id]
        }
    });

    const json = await response.json();
    if (!json.success) throw new Error(json.message || 'Failed to fetch reviews');

    return json;
};

export {
    getReviews
};