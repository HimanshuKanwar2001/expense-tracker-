import express from 'express';
import { getUserAnalytics } from '../controllers/analyticsController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticateUser);
router.get('/', getUserAnalytics); // accessible to all roles

export default router;
