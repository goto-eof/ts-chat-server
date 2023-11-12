import User from "../entity/User";
import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import UserCreateInput from "../input/UserCreateInput";
import UserOutput from "../output/UserOutput";
import UserSignIn from "../input/UserSignIn";
import {userService} from "../service/UserService";
import {MyContext} from "../index";
import AuthGuard from "../decorator/AuthGuard";

@Resolver()
export class UserResolver {
    @Query(() => User)
    @AuthGuard
    async getUser(@Ctx() context: MyContext, @Arg("id") id: number) {
        return await userService.getMessage(id);
    }

    @Query(() => UserOutput)
    async signIn(@Ctx() context: MyContext, @Arg("user") user: UserSignIn): Promise<UserOutput> {
        return await userService.signIn(user);
    }

    @Query(() => [User])
    @AuthGuard
    async getUsers(@Ctx() context: MyContext): Promise<Array<User>> {
        return await userService.getUsers();
    }

    @Mutation(() => UserOutput, {nullable: true})
    async addUser(@Arg("user") userIn: UserCreateInput): Promise<UserOutput | null> {
        return await userService.createUser(userIn);
    }

    @Mutation(() => Boolean, {nullable: false})
    @AuthGuard
    async deleteUser(@Ctx() context: MyContext, @Arg("id") id: number): Promise<boolean> {
        return await userService.deleteUser(id);
    }

}
