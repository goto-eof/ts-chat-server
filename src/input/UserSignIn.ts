import {Field, InputType} from "type-graphql";

@InputType()
export default class UserSignIn {

    @Field(() => String, {name: "email"})
    email: string;

    @Field(() => String, {name: "password"})
    password: string;
}