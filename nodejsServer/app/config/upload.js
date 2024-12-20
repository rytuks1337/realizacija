import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(path.join(__dirname, '../uploads/'));
        cb(null, path.join(__dirname, '../uploads/')); // Save files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const randomString = Math.random().toString(36).substring(2, 15);
        const retain_extension = path.extname(file.originalname);
        const uniqueName = `${randomString}${retain_extension}`;
        console.log(uniqueName);
        cb(null, uniqueName); // Rename file to include timestamp for uniqueness
    },
});

export default storage