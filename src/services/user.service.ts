import { IUser } from "../../type";
import User from "../models/user.model";
import { hashPassword } from "../utils/hashPassword";


export const userRegister = async (user: IUser) => {
  try {
    const isUserExist = await User.findOne({
      $or: [
        { email: user.email },
        { username: user.username },
        { phoneNumber: user.phoneNumber }
      ]
    });
    if (isUserExist) {
      return null;
    }else{

    const hashedPassword = await hashPassword(user.password);
    const newUser = await User.create({
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber, 
      password: hashedPassword,
      profilePicture: user.profilePicture || null, 
      roles: user.role || 'USER', 
      firstName: user.firstName || null, 
      lastName: user.lastName || null,
      location: user.location || null,
      bio: user.bio || null,
    });

    return newUser;
}
  } catch (error) {
   throw new Error(`Registration failed: ${(error as any).message}`)
  }
};

export const getAllUsers = async () => {
    const users = await User.find();
    return users;
}

export const getUserById = async (id: string) => {
    const user = await User.findOne({_id:id});
    return user;
}

export const getUserByUsernameOrPhonenumber = async (username: string,phoneNumber:string) => {
    const user = await User.findOne({
        $or:[
            {username: username},
            {phoneNumber: phoneNumber}
        ]
    });
    return user;
}