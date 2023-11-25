import { TUser } from './user.interface';
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
  const checkUserExisting = userModel.isUserExists(userId);
  if (await checkUserExisting) {
    const result = userModel.findOne({ userId });
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

export const UserService = {
  createUserInDB,
  getUsers,
  getOneUser,
};