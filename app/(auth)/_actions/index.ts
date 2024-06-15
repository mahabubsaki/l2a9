'use server';

import envConfig from "@/app/_configs/env.config";
import { createSession } from "../_libs/session";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


const createUser = async (data: FieldValues) => {
    const { email, password, name, role } = data;
    const response = await fetch(envConfig.baseURL + '/register', {
        body: JSON.stringify({ email, password, name, role }),
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
const signInUser = async (data: FieldValues) => {
    const { email, password } = data;
    const response = await fetch(envConfig.baseURL + '/login', {
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    });
    const json = await response.json();
    if (!json.success) throw new Error(json.message || 'Failed to login.');
    await createSession(json.id);

    return json;


};

const deleteCookie = async (name: string) => {
    cookies().delete(name);
};

export {
    createUser,
    deleteCookie,
    signInUser
};