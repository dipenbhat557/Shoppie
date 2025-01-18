import { Request } from "express";
import multer from "multer";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
		if (file.mimetype.startsWith('image/')) {
			cb(null, true);
		} else {
			cb(new Error('Only image files are allowed'));
		}
	},
});
export default upload;