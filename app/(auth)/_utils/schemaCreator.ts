import { z } from "zod";

const signUpZodSchema = z.object({
    name: z.string().min(4, {
        message: 'Name must be at least 4 characters long'
    }).max(20, {
        message: 'Name must be at most 20 characters long'

    }),
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long'
    }).regex(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, {
        message: 'Password must contain at least one special character'
    }),
    confirmPassword: z.string().nonempty({
        message: 'Please confirm your password'

    })
}).refine(data => data.confirmPassword === data.password, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
});

const signInZodSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long'
    }),
});

const allSchema = {
    'sign-up': signUpZodSchema,
    'sign-in': signInZodSchema,

};

const schemaCreator = (type: keyof typeof allSchema) => {
    return allSchema[type];
};
export default schemaCreator;

