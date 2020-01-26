import Users from '../models/users';

interface userDetails {
  firstName: string;
  lastName: string;
  phone: string;
  bvn: string;
  email: string;
  password: string;
}

export async function getAllUsers() {
  return Users.find({ deletedAt: null }).sort({ firstName: 'asc' });
}

export async function getAuser(userId: string) {
  return Users.findById(userId);
}

export async function createUser(userObj: userDetails) {
  const existingUser = await Users.find({
    email: userObj.email,
    phone: userObj.phone,
  });

  if (existingUser.length !== 0) {
    throw new Error('User already exists');
  }

  const newUser = new Users(userObj);

  return newUser.save();
}

export async function updateUser(
  userId: string,
  userObj: Partial<userDetails>,
) {
  return Users.findOneAndUpdate({ _id: userId }, userObj, { new: true });
}

export async function deleteUser(userId: string) {
  return Users.findOneAndUpdate({ _id: userId }, { deletedAt: new Date() });
}
