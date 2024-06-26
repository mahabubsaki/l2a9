'use server';

import envConfig from "@/app/_configs/env.config";
import { createSession } from "../_libs/session";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";


const createUser = async (data: FieldValues) => {
    const { email, password, name, role } = data;
    const response = await fetch(envConfig.baseURL + '/register', {
        body: JSON.stringify({ email, password, name, role }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    });
    const json = await response.json();
    if (!json.success) return { error: true, message: json.message || 'Failed to sign in.' };;
    await createSession(json.id);

    return json;

};
const signInUser = async (data: FieldValues) => {
    const { email, password } = data;
    const response = await fetch(envConfig.baseURL + '/login', {
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    });
    const json = await response.json();
    if (!json.success) return { error: true, message: json.message || 'Failed to sign in.' };
    await createSession(json.id);

    return json;


};

const deleteCookie = async (name: string) => {
    cookies().delete(name);
    revalidateTag('user');
};

export {
    createUser,
    deleteCookie,
    signInUser
};