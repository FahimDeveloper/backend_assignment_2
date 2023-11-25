import { TOrder, TUser } from './user.interface';
import { userModel } from './user.model';

const createUserInDB = async (user: TUser) => {
  const result = await userModel.create(user);
  return result;
};

const getUsers = async () => {
  const result = await userModel
    .find()
    .select({ username: 1, fullName: 1, age: 1, email: 1, address: 1 });
  return result;
};

const getOneUser = async (userId: number) => {
  const checkUserExisting = await userModel.isUserExists(userId);
  if (checkUserExisting) {
    const result = await userModel.findOne({ userId });
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

const updateOneUser = async (userId: number, data: TUser) => {
  const checkUserExisting = await userModel.isUserExists(userId);
  if (checkUserExisting) {
    const result = await userModel
      .findOneAndUpdate({ userId }, data)
      .select('-password');
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

const deleteUser = async (userId: number) => {
  const checkUserExisting = await userModel.isUserExists(userId);
  if (checkUserExisting) {
    const result = await userModel.deleteOne({ userId });
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

const totalPriceOfUserOrder = async (userId: number) => {
  const checkUserExisting = userModel.isUserExists(userId);
  if (await checkUserExisting) {
    const result = await userModel.aggregate([
      { $match: { userId: userId } },
      {
        $project: {
          total: {
            $sum: '$orders.price',
          },
        },
      },
    ]);
    return result.length > 0 ? result[0].total : 0;
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
  totalPriceOfUserOrder,
};
