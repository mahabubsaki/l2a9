'use server';

import envConfig from "@/app/_configs/env.config";


const createUser = async (data) => {
    const { email, password, name } = data;
    const response = await fetch(envConfig.baseURL + '/register', {
        body: JSON.stringify({ email, password, name }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    });
    const json = await response.json();
    return json;
};

export {
    createUser
};