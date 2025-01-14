import bcrypt from "bcrypt";
export const hashPassword = async (password: string) => {
    const hashpass = await bcrypt.hash(password, 10);
    return hashpass;
}