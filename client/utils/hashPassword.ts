import bcrypt from "bcryptjs";
import { PasswordSchema } from "@batiyoun/common";


export const hashPassword = async (password: string): Promise<string> => {
    PasswordSchema.shape.password.parse(password); 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    PasswordSchema.shape.password.parse(password);
    return await bcrypt.compare(password, hashedPassword);
};