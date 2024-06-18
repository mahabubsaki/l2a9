import envConfig from "@/app/_configs/env.config";

const postProduct = async (data: FormData, images) => {
    const imageFormData = new FormData();

    images.forEach((image, index) => {
        imageFormData.append(`files`, image);
    });

    const response1 = await fetch(envConfig.publicBaseURL + '/upload', {
        method: 'POST',
        body: imageFormData
    });

    // const response = await fetch(envConfig.publicBaseURL + '/product', {
    //     method: 'POST',
    //     body: new URLSearchParams(data as any),
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // });
    // const json = await response.json();
    // if (!json.success) throw new Error(json.message || 'Failed to post product');

    // console.log(json);
    // return json;

};

export {
    postProduct
};