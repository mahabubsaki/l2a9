import { z } from "zod";

const signUpZodSchema = z.object({
    name: z.string()
});

const allSchema = {
    'sign-up': signUpZodSchema

};

const schemaCreator = (type: keyof typeof allSchema) => {
    return allSchema[type];
};
export default schemaCreator;

