import Users from '../models/users';

interface userDetails {
  firstName: string;
  lastName: string;
  phone: string;
  bvn: string;
  email: string;
  password: string;
  pin: string;
}

export async function getAllUsers() {
  return await Users.find({ deletedAt: null }).sort({ firstName: 'asc' });
}

export async function getAUser(userId: string) {
  return await Users.findOne({ _id: userId, deletedAt: null });
}

export async function createUser(userObj: userDetails) {
  const existingUser = await Users.findOne({ email: userObj.email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = new Users(userObj);
  return newUser.save();
}

export async function updateUser(
  userId: string,
  userObj: Partial<userDetails>,
) {
  return await Users.findOneAndUpdate({ _id: userId }, userObj, { new: true });
}

export async function deleteUser(userId: string) {
  return await Users.findOneAndUpdate(
    { _id: userId },
    { deletedAt: new Date() },
  );
}
