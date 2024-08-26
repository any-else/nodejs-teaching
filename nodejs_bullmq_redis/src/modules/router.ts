import { Router } from 'express';
import { HealthController } from './health/health.controller';
import { QueueRouter } from './queue/queue.controller';
import { TechnologyController } from './technology/technology.controller';
import { UploadRouter } from './upload/upload.router';

const router = Router();

router.use('/health', HealthController.router);
router.use('/technology', TechnologyController.router);
router.use('/queue', QueueRouter.router);
router.use('/upload', UploadRouter.router);

export const apiRouter = router;
