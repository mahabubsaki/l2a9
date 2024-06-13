import axios from "axios";

export const useAxiosPublic = () => {
    const instance = axios.create({
        baseURL: "http://localhost:3001",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return instance;
};