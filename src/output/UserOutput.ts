import {Field, ObjectType} from "type-graphql";
import User from "../entity/User";

@ObjectType()
export default class UserOutput {

    @Field(() => User, {name: "user"})
    user: User;

    @Field(() => String, {name: "jwt"})
    jwt: string;
}