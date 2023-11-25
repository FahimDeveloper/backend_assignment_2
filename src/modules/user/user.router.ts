import express from 'express';
import { userControllers } from './user.controllers';

const router = express.Router();
//server request
router.post('/api/users', userControllers.createUser);
router.get('/api/users', userControllers.getAllUser);
router.get('/api/users/:userId', userControllers.getSingleUser);

export const userRoutes = router;
