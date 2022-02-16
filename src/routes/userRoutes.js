import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController';
import protectedRoute from '../middlewares/tokenVerification';

router.post('/register', UserController.registerUser);
router.get('/users',  protectedRoute.loggedInUser , UserController.getUsers);
router.post('/login', UserController.userLogin);
router.get('/profile', 
protectedRoute.loggedInUser , 
UserController.getUser);


export default router;