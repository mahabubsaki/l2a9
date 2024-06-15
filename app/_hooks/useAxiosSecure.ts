import axios from "axios";

export const useAxiosSecure = () => {
    const instance = axios.create({
        baseURL: "http://localhost:3001",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return instance;
};