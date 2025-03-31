const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");
const s3 = require("../configs/s3");

const createUploadMiddleware = (fields) => {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.AWS_S3_BUCKET_NAME,
            metadata: (req, file, cb) => {
                cb(null, { fieldName: file.fieldname });
            },
            key: (req, file, cb) => {
                cb(null, `uploads/${uuidv4()}-${file.originalname}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("audio/")) {
                cb(null, true);
            } else {
                cb(new Error("Invalid file type. Only images and audio files are allowed."));
            }
        },
    }).fields(fields);
};

const playlistUpload = createUploadMiddleware([{ name: "image", maxCount: 1 }]);
const topicUpload = createUploadMiddleware([
    { name: "icon", maxCount: 1 },
    { name: "image", maxCount: 1 },
]);
const userUpload = createUploadMiddleware([{ name: "image", maxCount: 1 }]);
const podcastUpload = createUploadMiddleware([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
]);

module.exports = {
    playlistUpload,
    topicUpload,
    userUpload,
    podcastUpload,
};
