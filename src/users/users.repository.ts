import { IUser } from "./users.interface";
import User from "./users.interface";
import IUserRepository from "./Iusers.repository";
import bcrypt from 'bcryptjs'


class UserRepository implements IUserRepository {

    async registerUser(userData: IUser): Promise<IUser>{
        try {
            const foundUser = await User.exists({email: userData.email})
            if(foundUser){
                throw new Error("User already exists")
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            const newUser = await User.create({...userData, password: hashedPassword});
            return newUser
        } catch (error) {
            throw new Error(`Error creating account: ${error}`)
        }
    }

    async loginUser(username: string, password: string): Promise<IUser | null>{
        try {
            const foundUser = await User.findOne({username})
            if(!foundUser){
                return null;
            }
            
            const isMatch = await bcrypt.compare(password, foundUser.password)
            if(!isMatch){
                return null
            }
            return foundUser;
        } catch (error) {
            throw new Error(`Error: username or password incorrect ${error}`)
        }
    }

    async logoutUser(req: Express.Request): Promise<void>{
        try {
            req.session.destroy((err) => {
                if(err){
                    throw new Error(`Error logging out: ${err}`)
                }
            })
        } catch (error) {
            throw new Error(`Error logging out: ${error}`)
        }
    }
}

export default UserRepository