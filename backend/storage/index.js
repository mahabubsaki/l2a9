const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Assignment-9',
        allowedFormats: ['jpeg', 'png', 'jpg', 'svg'],
        public_id: () => {
            return process.env.CLOUDINARY_PUBLIC_ID + '-' + Date.now();
        }
    },

});

const upload = multer({ storage, });

module.exports = upload;
