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
    res.status(404).json({
      success: false,
      message: 'User creation failed',
      error: {
        code: 404,
        description: error?.issues ? error?.issues[0].message : error?.message,
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
    res.status(404).json({
      success: false,
      message: 'Users fetched failed',
      error: {
        code: 404,
        description: error?.issues ? error?.issues[0].message : error?.message,
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
    res.status(404).json({
      success: false,
      message: 'Users fetched failed',
      error: {
        code: 404,
        description: error?.issues ? error?.issues[0].message : error?.message,
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
    res.status(404).json({
      success: false,
      message: 'Users updated failed',
      error: {
        code: 404,
        description: error?.issues ? error?.issues[0].message : error?.message,
      },
    });
  }
};

const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    await UserService.deleteUser(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User deleted failed',
      error: {
        code: 404,
        descripton: error?.issues ? error?.issues[0].message : error?.message,
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
    res.status(404).json({
      success: false,
      message: 'Order creation failed',
      error: {
        code: 404,
        descripton: error?.issues ? error?.issues[0].message : error?.message,
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
      message: 'Orders fatched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Orders failed to be fetched',
      error: {
        code: 404,
        descripton: error?.issues ? error?.issues[0].message : error?.message,
      },
    });
  }
};

const userOrdersTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.totalPriceOfUserOrder(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error?.issues ? error?.issues[0].message : error?.message,
      error: {
        code: 404,
        descripton: error?.issues ? error?.issues[0].message : error?.message,
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
  userOrdersTotalPrice,
};
