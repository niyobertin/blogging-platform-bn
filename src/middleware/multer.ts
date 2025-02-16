import multer from 'multer';
import path from 'path';

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.mp4', '.avi', '.mov', '.mkv'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    const error: any = { code: 'INVALID_FILE_TYPE', message: 'Wrong format for file' };
    cb(new Error(error.message));
    return;
  }

  cb(null, true);
};

// Set up multer with storage and file filter
const upload = multer({
  storage,
  fileFilter,
});

export default upload;
