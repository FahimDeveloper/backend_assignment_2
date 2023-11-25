/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ordersValidation, userValidation } from './user.validation';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const validResult = userValidation.parse(userData);
    const result = await UserService.createUserInDB(validResult);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.issues[0].message || error?.message,
      error: {
        code: 400,
        description: error?.issues[0].message || error?.message,
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.issues[0].message || error?.message,
      error: {
        code: 400,
        description: error?.issues[0].message || error?.message,
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserService.getOneUser(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.issues[0].message || error?.message,
      error: {
        code: 400,
        description: error?.issues[0].message || error?.message,
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { body } = req;
    const result = await UserService.updateOneUser(Number(userId), body);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.issues[0].message || error?.message,
      error: {
        code: 400,
        description: error?.issues[0].message || error?.message,
      },
    });
  }
};

const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserService.deleteUser(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.issues[0].message || error?.message,
      error: {
        code: 400,
        descripton: error?.issues[0].message || error?.message,
      },
    });
  }
};

const createOrderForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { body } = req;
    const validResult = ordersValidation.parse(body);
    const result = await UserService.createUserOrder(
      Number(userId),
      validResult,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.issues[0].message || error?.message,
      error: {
        code: 400,
        descripton: error?.issues[0].message || error?.message,
      },
    });
  }
};

const getUserAllOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserService.getUserOrders(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Order fatched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.issues[0].message || error?.message,
      error: {
        code: 400,
        descripton: error?.issues[0].message || error?.message,
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  updateSingleUser,
  getSingleUser,
  deleteOneUser,
  createOrderForUser,
  getUserAllOrder,
};
