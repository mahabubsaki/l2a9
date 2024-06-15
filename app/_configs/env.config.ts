

const envConfig = {
    baseURL: process.env.API_URL,
    jwtSecret: process.env.JWT_SECRET,
    publicBaseURL: process.env.NEXT_PUBLIC_API_URL
};

export default envConfig;