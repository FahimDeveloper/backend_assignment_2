import { TOrder, TUser } from './user.interface';
import { userModel } from './user.model';

const createUserInDB = async (user: TUser) => {
  const result = await userModel.create(user);
  return result;
};

// number 2 need more work on this function
const getUsers = async () => {
  const result = await userModel.find();
  return result;
};

// number 3 need more work on this function
const getOneUser = async (userId: number) => {
  const checkUserExisting = await userModel.isUserExists(userId);
  if (checkUserExisting) {
    const result = await userModel.findOne({ userId });
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

// number 4 need more work on this function
const updateOneUser = async (userId: number, data: TUser) => {
  const checkUserExisting = await userModel.isUserExists(userId);
  if (checkUserExisting) {
    const result = await userModel.findOneAndUpdate({ userId }, data);
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

const deleteUser = async (userId: number) => {
  const checkUserExisting = await userModel.isUserExists(userId);
  if (checkUserExisting) {
    const result = await userModel.findOneAndDelete({ userId });
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

const createUserOrder = async (
  userId: number,
  orderData: TOrder | undefined,
) => {
  const checkUserExisting = await userModel.isUserExists(userId);
  if (checkUserExisting) {
    const result = await userModel.findOneAndUpdate(
      { userId },
      { $push: { orders: { $each: [orderData] } } },
    );
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

const getUserOrders = async (userId: number) => {
  const checkUserExisting = userModel.isUserExists(userId);
  if (await checkUserExisting) {
    const result = userModel.findOne({ userId }).select({ orders: 1 });
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

export const UserService = {
  createUserInDB,
  getUsers,
  getOneUser,
  updateOneUser,
  deleteUser,
  createUserOrder,
  getUserOrders,
};
