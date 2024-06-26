

const envConfig = {
    baseURL: process.env.NODE_ENV === 'development' ? process.env.API_URL_LOCAL : process.env.API_URL,
    jwtSecret: process.env.JWT_SECRET,
    publicBaseURL: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_API_URL_LOCAL : process.env.NEXT_PUBLIC_API_URL,
    env: process.env.NODE_ENV,
};

export default envConfig;