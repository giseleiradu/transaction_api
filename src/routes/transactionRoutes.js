import express from 'express';
const router = express.Router();
import TransactionController from '../controllers/TransactionController';
import protectedRoute from '../middlewares/tokenVerification';

router.post('/transact', protectedRoute.loggedInUser ,TransactionController.transact);
router.get('/transactions', protectedRoute.loggedInUser ,TransactionController.getAllTransactions)

export default router;