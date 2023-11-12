import {Repository} from "typeorm";
import User from "../entity/User";
import {AppDataSource} from "../config/DataSource";
import {GraphQLError} from "graphql";
import {compare, hash} from "bcrypt";
import {sign} from "jsonwebtoken";
import UserSignIn from "../input/UserSignIn";
import UserCreateInput from "../input/UserCreateInput";

export class UserService {
    constructor(public userRepository: Repository<User>) {
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.createQueryBuilder('user')
            .select("user")
            .addSelect('user.password')
            .select()
            .where('email = :email', {email})
            .getOne();

        return user;
    }

    async getMessage(id: number) {
        return await User.findOne({where: {id: id}});
    }

    async signIn(user: UserSignIn) {
        const userFound = await userService.findOneByEmail(user.email);
        if (!userFound === null) {
            throw new GraphQLError("User not found");
        }
        const bcryptPasswordMatch = compare(user.password, userFound!.password);
        if (!bcryptPasswordMatch) {
            throw new GraphQLError("Password does not match");
        }
        const jwtToken = sign({email: userFound!.email, id: userFound!.id}, process.env.JWT_KEY!, {
            expiresIn: '7 days'
        })
        return {user: userFound!, jwt: jwtToken};
    }


    async getUsers() {
        return await User.find();
    }


    async createUser(userIn: UserCreateInput) {
        console.log("ciao")
        try {
            const password = await hash(userIn.password, 10);
            const user = User.create({
                firstName: userIn.firstName,
                lastName: userIn.lastName,
                username: userIn.username,
                password: password,
                email: userIn.email
            });
            console.log(user);
            const userSaved = await user.save();
            const jwtToken = sign({email: userIn.email, id: userSaved.id}, process.env.JWT_KEY!, {
                expiresIn: '7 days'
            })
            return {user: userSaved, jwt: jwtToken};
        } catch (error) {
            throw new GraphQLError("Unable to save data: " + error);
        }
    }


    async deleteUser(id: number) {
        const user = await User.findOne({where: {id}});
        if (!user) {
            throw new Error("User not found :|");
        }
        await user.remove();
        return true;
    }
}

export const userService = new UserService(AppDataSource.getRepository(User));