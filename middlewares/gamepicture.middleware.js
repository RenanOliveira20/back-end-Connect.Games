const cloudinary = require('../config/cloudinary.config');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ConnectGames/imageGames',
        resource_type: 'image',
    },
});

const uploadImage = multer({ storage });

module.exports = uploadImage