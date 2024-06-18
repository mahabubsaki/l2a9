import envConfig from "@/app/_configs/env.config";

const postProduct = async (data: FormData, images: File[]) => {

    const imageFormData = new FormData();

    images.forEach((image) => {
        imageFormData.append(`files`, image);
    });

    const response1 = await fetch(envConfig.publicBaseURL + '/upload', {
        method: 'POST',
        body: imageFormData
    });
    const json1 = await response1.json();
    if (!json1.success) throw new Error(json1.message || 'Failed to upload image');
    console.log(json1);


    json1.data.forEach((image: string) => {
        data.append('images[]', image);

    });
    const response = await fetch(envConfig.publicBaseURL + '/product', {
        method: 'POST',
        body: new URLSearchParams(data as any),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const json = await response.json();
    if (!json.success) throw new Error(json.message || 'Failed to post product');
    return json;

};

export {
    postProduct
};