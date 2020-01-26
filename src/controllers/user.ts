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

export async function getAuser(userID: string) {
  return Users.findById(userID);
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
  userID: string,
  userObj: Partial<userDetails>,
) {
  return Users.findOneAndUpdate({ _id: userID }, userObj, { new: true });
}

export async function deleteUser(userID: string) {
  return Users.findOneAndUpdate({ _id: userID }, { deletedAt: new Date() });
}
