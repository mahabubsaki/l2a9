import axios from "axios";
import envConfig from "../_configs/env.config";

export const useAxiosPublic = () => {
    const instance = axios.create({
        baseURL: envConfig.publicBaseURL,
    });
    return instance;
};