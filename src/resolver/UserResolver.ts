import User from "../entity/User";
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import UserCreateInput from "../input/UserCreateInput";

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
            return null;
        }
    }

}
