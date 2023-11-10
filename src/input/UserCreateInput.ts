import {Field, InputType} from "type-graphql";
import {MaxLength, MinLength} from "class-validator";

@InputType()
export default class UserCreateInput {

    @Field(() => String, {nullable: false})
    username: string;

    @MinLength(6, {
        message: 'password is too short',
    })
    @MaxLength(20, {
        message: 'password is too long',
    })
    @Field(() => String, {nullable: false})
    password: string;

    @Field(() => String, {nullable: false})
    email: string;

    @Field(() => String, {nullable: false})
    firstName: string;

    @Field(() => String, {nullable: false})
    lastName: string;
}