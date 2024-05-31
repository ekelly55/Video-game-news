import { IUser } from "./users.interface";

interface IUserRepository {
    registerUser(userData: IUser): Promise<IUser>;
    loginUser(userName: string, password: string): Promise<IUser | null>;
    logoutUser(req: Express.Request): Promise<void>;
}

export default IUserRepository