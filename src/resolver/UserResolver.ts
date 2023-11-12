import User from "../entity/User";
import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import UserCreateInput from "../input/UserCreateInput";
import ApplicationError from "../error/ApplicationError";
import {compare, hash} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import UserOutput from "../output/UserOutput";
import UserSignIn from "../input/UserSignIn";
import {userService} from "../service/UserService";
import {GraphQLError} from "graphql";
import {MyContext} from "../index";

@Resolver()
export class UserResolver {
    @Query(() => User)
    async getUser(@Arg("id") id: number) {
        return await User.findOne({where: {id: id}});
    }


    @Query(() => UserOutput)
    async signIn(@Ctx() context: MyContext, @Arg("user") user: UserSignIn): Promise<UserOutput> {
        console.log(context);
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

    @Query(() => [User])
    async getUsers(): Promise<Array<User>> {
        return await User.find();
    }

    @Mutation(() => UserOutput, {nullable: true})
    async addUser(@Arg("user") userIn: UserCreateInput): Promise<UserOutput | null> {
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
            throw new ApplicationError("Unable to save data: " + error);
        }
    }

    @Mutation(() => Boolean, {nullable: false})
    async deleteUser(@Arg("id") id: number): Promise<boolean> {
        const user = await User.findOne({where: {id}});
        if (!user) {
            throw new Error("User not found :|");
        }
        await user.remove();
        return true;
    }

}
