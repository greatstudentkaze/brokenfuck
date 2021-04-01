import Router from 'express';

import roleMiddleware from '../middlewares/role.js';
import controller from '../controllers/mission.js';

const router = Router();

router.post('/', roleMiddleware(['ADMIN']), controller.createMission);
router.get('/', roleMiddleware(['USER']), controller.getMissions);

export default router;
