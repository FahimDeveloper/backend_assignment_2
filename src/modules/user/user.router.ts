import express from 'express';
import { userControllers } from './user.controllers';

const router = express.Router();
//server request
router.post('/api/users', userControllers.createUser);
router.get('/api/users', userControllers.getAllUser);
router.get('/api/users/:userId', userControllers.getSingleUser);
router.put('/api/users/:userId', userControllers.updateSingleUser);
router.delete('/api/users/:userId', userControllers.deleteOneUser);
router.put('/api/users/:userId/orders', userControllers.createOrderForUser);

export const userRoutes = router;
