const path = require('node:path');
const fs = require('node:fs/promises');

const removeFile = async (file1, file2) => {

    console.log("file", file1, file2)
    const uploadsDir = path.join(__dirname, '../uploads/');
    try {
        const files = await fs.readdir(uploadsDir); 
        const filesToDelete = new Set([file1, file2]); 
    
        for (const file of files) {
            // console.log("fileDirectory", file);
            if (filesToDelete.has(file)) {
                // console.log("file", file);
                const filePath = path.join(uploadsDir, file);
                await fs.unlink(filePath); 
            }
        }
    } catch (err) {
        console.error("Error reading directory or deleting files", err);
    }
}

module.exports = removeFile
