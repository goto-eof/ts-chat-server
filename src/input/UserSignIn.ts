import {Field, InputType} from "type-graphql";
import {MinLength} from "class-validator";

@InputType()
export default class UserSignIn {

    @Field(() => String, {name: "email"})
    @MinLength(5, {
        message: 'email is too short',
    })
    email: string;

    @Field(() => String, {name: "password"})
    password: string;
}