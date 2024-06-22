import axios from "axios";
import envConfig from "../_configs/env.config";
import { deleteSession } from "../(auth)/_libs/session";
import { toast } from "sonner";

export const useAxiosSecure = () => {
    const instance = axios.create({
        baseURL: envConfig.publicBaseURL,
        withCredentials: true,
    });
    instance.interceptors.response.use((data) => {
        return data;
    }, async (err) => {
        toast.error(err?.response?.data?.message || 'Failed to verify session');
        console.log(err.response);
        if (err.response.status === 401) {

            await deleteSession();
        }
        return Promise.reject(err);
    });
    return instance;
};