/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import userValidation from './user.validation';
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
      message: error?.message,
      error: {
        code: 400,
        description: error?.message,
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
      message: error?.message,
      error: {
        code: 400,
        description: error?.message,
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
      message: error?.message,
      error: {
        code: 400,
        description: error?.message,
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
};
