'use server';

import envConfig from "@/app/_configs/env.config";
import { createSession } from "../_libs/session";
import { cookies } from "next/headers";


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
    if (!json.success) throw new Error(json.message || 'Failed to create user.');
    await createSession(json.id);

    return json;

};
const deleteCookie = async (name: string) => {
    cookies().delete(name);
};

export {
    createUser,
    deleteCookie
};