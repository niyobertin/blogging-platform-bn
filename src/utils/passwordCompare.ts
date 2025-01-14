import bcrypt from "bcrypt";
export const isPasswordMatch = (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};