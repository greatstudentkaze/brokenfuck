import Router from 'express';

import authMiddleware from '../middlewares/auth.js';
import roleMiddleware from '../middlewares/role.js';
import controller from '../controllers/account.js';

const router = Router();

router.post('/create', authMiddleware, roleMiddleware(['USER']), controller.createAccount);
router.get('/:login/progress', roleMiddleware(['USER']), controller.getMissionsProgress);
router.post('/:login/progress', roleMiddleware(['USER']), controller.updateAccountProgress);
router.get('/', authMiddleware, roleMiddleware(['USER']), controller.getUserAccounts);

export default router;
