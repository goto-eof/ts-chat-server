import User from "../entity/User";
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import UserCreateInput from "../input/UserCreateInput";
import ApplicationError from "../error/ApplicationError";

@Resolver()
export class UserResolver {
    @Query(() => User)
    async getUser(@Arg("id") id: number) {
        return await User.findOne({where: {id: id}});
    }

    @Query(() => [User])
    async getUsers(): Promise<Array<User>> {
        return await User.find();
    }

    @Mutation(() => User, {nullable: true})
    async addUser(@Arg("user") userIn: UserCreateInput): Promise<User | null> {
        console.log("ciao")
        try {
            const user = User.create({
                firstName: userIn.firstName,
                lastName: userIn.lastName,
                username: userIn.username,
                password: userIn.password,
                email: userIn.email
            });
            console.log(user);
            return await user.save();
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
