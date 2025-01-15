import { sign } from "jsonwebtoken";
import { IUser } from "../../type";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = async (user: IUser) => {
  const accessToken = sign(
    {
      username:user.username,
      role: user.roles,
      email: user.email,
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: "48h" },
  );
  return accessToken;
};