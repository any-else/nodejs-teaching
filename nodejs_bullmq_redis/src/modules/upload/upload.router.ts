import { Router } from 'express';
import { uploadFile, uploadResult } from './handlers/upload-without-bull';

const uploadRouter = Router();

uploadRouter.post('/upload', uploadFile);
uploadRouter.get('/result', uploadResult);

export const UploadRouter = { router: uploadRouter };
