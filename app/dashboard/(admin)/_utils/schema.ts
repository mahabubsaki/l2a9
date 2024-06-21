
import { z } from "zod";
import { PRODUCT_CATEGORY } from "../_constants";




const addProductSchema = z.object({
    name: z.string().min(5, {
        message: 'Name must be at least 5 characters long'
    }).max(50, {
        message: 'Name must be at most 50 characters long'
    }),
    description: z.string().min(10, {
        message: 'Description must be at least 10 characters long'
    }).max(200, {
        message: 'Description must be at most 200 characters long'
    }),
    size: z.enum(['xs', 's', 'm', 'l', 'xl', 'xxl'], {
        message: 'Size required',

    }).array().nonempty({
        message: 'Must select at least one size'
    }),
    gender: z.enum(['male', 'female'], {
        message: 'Gender required'
    }),
    price: z.coerce.number({
        message: 'Price required',
        invalid_type_error: 'Price must be a number'
    }).positive({
        message: 'Price must be a positive number'
    }).max(1000, {
        message: 'Price must be at most 1000'
    }),
    stock: z.coerce.number({
        message: 'Stock required',
        invalid_type_error: 'Stock must be a number'
    }).positive({
        message: 'Stock must be a positive number'
    }).max(100, {
        message: 'Stock must be at most 100'
    }),
    image: z.array(z.object({
        url: z.string(),
        file: z.instanceof(File).refine((file) => file.size < 1024 * 1024 * 3, {
            message: 'File size must be at most 3MB'
        }),
        deleted: z.boolean()
    })).nonempty({
        message: 'At least one image required'
    }).refine((files) => files.every(obj => obj.file.size < 1024 * 1024 * 3), {
        message: 'Every image must be at most 3MB'

    }).refine((files) => files.some(obj => obj.deleted === false), {
        message: 'At least one image required'

    }).refine((files) => files.filter(i => i.deleted === false).length <= 3, {
        message: 'At most 3 images allowed'
    }),
    //@ts-ignore
    category: z.enum(PRODUCT_CATEGORY, {
        message: 'Category required'
    }),
    discount: z.coerce.number({
        invalid_type_error: 'Discount must be a number'
    }).max(100, {
        message: 'Discount must be at most 100'
    }).optional().refine(value => {

        if (value !== undefined && value < 0) {
            return false;
        }
        return true;
    }, {
        message: "Discount must be a positive number"
    }),
    discountType: z.string().optional()


});





export {
    addProductSchema
};