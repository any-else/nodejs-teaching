import express, { Express, NextFunction, Request, Response } from 'express';
import expressOasGenerator, { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { apiRouter } from './modules/router';
import { corsMiddleware } from './middlewares/cors';
import fileUpload from 'express-fileupload';
import * as path from 'path';

export function bootstrapApp(): Express {
	const app = express();

	expressOasGenerator.handleResponses(app, {
		specOutputPath: 'swagger.json',
		writeIntervalMs: 2000,
		swaggerUiServePath: 'docs',
		specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
		swaggerDocumentOptions: {
			version: '3.0.3',
		},
	});

	app.set('views', path.join(__dirname, '../views'));

	app.set('view engine', 'ejs');

	app.use(express.json());
	app.use(fileUpload());

	app.use(express.static(path.join(__dirname, '../public')));
	app.options('*', corsMiddleware);
	app.use(corsMiddleware);

	app.use('/', apiRouter);
	app.get('/', function (req, res) {
		res.render('form');
	});
	app.use(genericErrorHandler);
	expressOasGenerator.handleRequests();
	return app;
}

function genericErrorHandler(err, req: Request, res: Response, next: NextFunction) {
	console.error('An unexpected error occurred', err);
	res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.send({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
	return next();
}
