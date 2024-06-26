'use server';
import 'server-only';

import envConfig from "@/app/_configs/env.config";

const secretKey = envConfig.jwtSecret!;
const key = new TextEncoder().encode(secretKey);
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from 'next/cache';



export async function encrypt(payload: { [key: string]: any; }) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('12hr')
        .sign(key);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.log('Failed to verify session', error);
        return null;
    }
}


export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);
    const response = await fetch(envConfig.baseURL + '/session', {
        body: JSON.stringify({ userId, expiresAt }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    });
    revalidateTag('session');
    const json = await response.json();
    if (!json.success) throw new Error(json.message || 'Failed to create session');

    const session = await encrypt({ userId, expiresAt });
    cookies().set('session', session, {
        httpOnly: true,
        secure: envConfig.env !== 'development',
        expires: expiresAt,
        sameSite: envConfig.env === 'development' ? 'lax' : 'none',
        path: '/',
        domain: envConfig.env === 'development' ? 'localhost' : 'vercel'
    });


}
export async function verifySession() {
    const cookie = cookies().get('session')?.value;

    if (!cookie) {
        return { isAuth: false };
    }

    const session = await decrypt(cookie);

    if (!session?.userId) {

        return { isAuth: false };
    }

    const response = await fetch(envConfig.baseURL + `/session?userId=${session.userId}`, {
        next: {
            tags: ['session']
        }
    });

    const json = await response.json();

    if (!json.success) throw new Error(json.message || 'Failed to verify session');


    const dbSession = json?.data?.sessions?.[0];

    if (!dbSession) {
        return { isAuth: false, };
    }
    // if (new Date(dbSession.expiresAt) < new Date()) {

    //     return { isAuth: false };
    // }


    return { isAuth: true, userId: dbSession.userId, role: json?.data?.role };
}

export async function deleteSession() {
    const cookie = cookies().get('session')?.value;

    if (!cookie) {
        redirect('/sign-in');
    }

    const session = await decrypt(cookie);
    if (!session?.userId) {
        redirect('/sign-in');
    }

    const userId = session.userId;
    const response = await fetch(envConfig.baseURL + `/session/${userId}`, {
        method: 'DELETE',
    });
    revalidateTag('session');
    const json = await response.json();
    if (!json.success) throw new Error(json.message || 'Failed to delete session');
    cookies().delete('session');
    redirect('/sign-in');

}