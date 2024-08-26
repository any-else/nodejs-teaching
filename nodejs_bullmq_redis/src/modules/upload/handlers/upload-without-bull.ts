import * as path from 'path';
import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';
import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function uploadFile(req: Request | any, res: Response, next: NextFunction) {
	const { image } = req.files as any;

	if (!image) return res.sendStatus(400);
	const imageName = path.parse(image.name).name;
	const processImage = (size) =>
		sharp(image.data)
			.resize(size, size)
			.webp({ lossless: true })
			.toFile(`./public/images/${imageName}-${size}.webp`);

	const sizes = [90, 96, 120, 144, 160, 180, 240, 288, 360, 480, 720, 1440];
	Promise.all(sizes.map(processImage));

	let counter = 0;

	for (let i = 0; i < 10000000000; i++) {
		counter++;
	}
	res.redirect('/upload/result');
}

export async function uploadResult(req: Request, res: Response, next: NextFunction) {
	console.log('aaaa');
	const imgDirPath = path.join(__dirname, '../../../../public/images');
	console.log('file', imgDirPath);
	const imgFiles = fs.readdirSync(imgDirPath).map((image) => {
		return `images/${image}`;
	});
	console.log(imgFiles);
	res.render('result', { imgFiles });
}
