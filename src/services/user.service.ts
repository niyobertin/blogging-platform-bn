import { IUser } from "../../type";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword";


export const userRegister = async (user: IUser) => {
    
    const isUserExist = await User.findOne({email:user.email});
    if(isUserExist){
        return null
    }
    const hashedPassword = await hashPassword(user.password);
    const newUser = await User.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        profilePicture: user.profilePicture,
        roles: user.roles
    });
    return newUser;
}

export const getAllUsers = async () => {
    const users = await User.find();
    return users;
}

export const getUserById = async (id: string) => {
    const user = await User.findOne({_id:id});
    return user;
}

export const getUserByEmail = async (email: string) => {
    const user = await User.findOne({email:email});
    return user;
}