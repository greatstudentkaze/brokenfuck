import Router from 'express';

import authMiddleware from '../middlewares/auth.js';
import roleMiddleware from '../middlewares/role.js';
import controller from '../controllers/account.js';

const router = Router();

router.post('/create', authMiddleware, roleMiddleware(['USER']), controller.createAccount);
router.get('/:login/progress', roleMiddleware(['USER']), controller.getMissionsProgress);
router.post('/:login/progress/weeks/:weekNumber/complete', roleMiddleware(['USER']), controller.completeWeekMissions);
router.post('/:login/progress/weeks/:weekNumber/clear', roleMiddleware(['USER']), controller.clearCompletionOfWeekMissions);
router.post('/:login/progress/missions/:id/points', roleMiddleware(['USER']), controller.updateUserPoints);
router.get('/', authMiddleware, roleMiddleware(['USER']), controller.getUserAccounts);

export default router;
