import { Request,Response } from "express";
import { getAllUsers, getUserByUsernameOrPhonenumber, getUserById, userRegister } from "../services/user.service";
import { IUser } from "../../type";
import { isPasswordMatch } from "../utils/passwordCompare";
import { generateToken } from "../utils/jwt";
import { uploadMedia } from "../utils/upload";


export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await getAllUsers();
      if (users) {
        res.status(200).json({
          status: 200,
          message: 'Users fetched successfully',
          count: users.length,
          data: users,
        });
      } else {
        res.status(404).json({
          status: 404,
          data: 'Users not found',
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unexpected error' });
      }
    }
  };
  export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const user = await getUserById(id);
      if (user) {
        res.status(200).json({
          status: 200,
          message: 'User fetched successfully',
          data: user,
        });
      } else {
        res.status(404).json({
          status: 404,
          data: 'User not found',
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unexpected error' });
      }
    }
  };
  export const register = async (req: Request, res: Response): Promise<void> => {
    const {
      username,
      email,
      phoneNumber,
      password,
      role,
      firstName,
      lastName,
      location,
      bio,
    } = req.body;
  
    const { file } = req;
    let profilePicture: any = null;
    if (file) {
      try {
        profilePicture = await uploadMedia(file);
      } catch (error) {
         console.log("File size is too big")
      }
    }
  
    const user = {
      username,
      email,
      phoneNumber,
      password,
      profilePicture,
      role,
      firstName,
      lastName,
      location,
      bio,
    };
  
    try {
      const newUser = await userRegister(user);
  
      if (newUser) {
        res.status(400).json({
          status: 400,
          message: 'User already exists',
        });
      } else {
        res.status(201).json({
          status: 201,
          message: 'Registration successful!',
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unexpected error' });
      }
    }
  };

  export const usersLogin = async (req: Request, res: Response): Promise<void> => {
    const { username, phoneNumber, password } = req.body;
    const user:any = await getUserByUsernameOrPhonenumber(username,phoneNumber);
    let accessToken;
    if(!user || user.length === 0){
      res.status(401).json({
        status: 401,
        message: " Invalid credentials!",
      });
    }else{
      const userInfo:any = {
          username: user.username,
          roles: user.roles,
          email: user.email,
      }
      accessToken  = await generateToken(userInfo)
      const isPasswordMatching = await isPasswordMatch(password, user.password);
      if(!isPasswordMatching){
        res.status(400).json({
          status: 400,
          message: "Invalid credentials!",
        });
      }else{
        res.status(200).json({
          status: 200,
          message: "Welcome back!",
          token: accessToken
        });
      }
    }
  } 
