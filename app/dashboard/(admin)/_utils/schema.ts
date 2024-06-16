import { z } from "zod";


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

    }),
    gender: z.enum(['men', 'women'], {
        message: 'Gender required'
    }),
    price: z.number({
        message: 'Price required'
    }).min(1, {
        message: 'Price must be at least 1'
    }),
    stock: z.number({
        message: 'Stock required'
    }).min(1, {
        message: 'Stock must be at least 1'
    }),
    image: z.string({
        message: 'Image required'
    }).url({
        message: 'Invalid image url'
    }),
    category: z.enum(['t-shirt', 'shirt', 'jeans', 'jacket', 'shoes', 'accessories'], {
        message: 'Category required'
    })


});





export {
    addProductSchema
};