const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

// AWS S3 Configuration
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const UPLOADS_FOLDER = path.join(__dirname, "../uploads");

const uploadFileToS3 = async (filePath, fileName) => {
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File does not exist: ${filePath}`);
        return null;
    }

    const fileBuffer = fs.readFileSync(filePath); // Read file into buffer

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `podcasts/${fileName}`,
        Body: fileBuffer,
        ContentType: getContentType(fileName), // Ensure correct content type
    };

    try {
        await s3.send(new PutObjectCommand(params));
        console.log(`✅ Successfully uploaded: ${fileName}`);
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/podcasts/${fileName}`;
    } catch (error) {
        console.error(`❌ Failed to upload ${fileName}:`, error);
        return null;
    }
};

// Function to determine content type
const getContentType = (fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    const mimeTypes = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".ogg": "audio/ogg",
        ".mp4": "video/mp4",
    };
    return mimeTypes[ext] || "application/octet-stream";
};

const migrateFiles = async () => {
    try {
        const files = fs.readdirSync(UPLOADS_FOLDER);

        for (const file of files) {
            const localFilePath = path.join(UPLOADS_FOLDER, file);

            // Skip directories
            if (!fs.lstatSync(localFilePath).isFile()) continue;

            console.log(`Uploading ${file} to S3...`);

            const uploadResult = await uploadFileToS3(localFilePath, file);
            if (uploadResult) {
                fs.unlinkSync(localFilePath); // Delete file if upload successful
                console.log(`✅ Deleted local file: ${file}`);
            }
        }

        console.log("🎉 Migration completed!");
    } catch (error) {
        console.error("❌ Migration failed:", error);
    }
};

migrateFiles();
