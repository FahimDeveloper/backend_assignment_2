import express from 'express';
import { userControllers } from './user.controllers';

const router = express.Router();
//server request
router.get('/', userControllers.getAllUser);
router.post('/', userControllers.createUser);
router.get('/:userId', userControllers.getSingleUser);
router.put('/:userId', userControllers.updateSingleUser);
router.delete('/:userId', userControllers.deleteOneUser);
router.put('/:userId/orders', userControllers.createOrderForUser);
router.get('/:userId/orders', userControllers.getUserAllOrder);
router.get('/:userId/orders/total-price', userControllers.userOrdersTotalPrice);

export const userRoutes = router;
