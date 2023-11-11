import {Field, InputType, Int} from "type-graphql";
import {MinLength} from "class-validator";

@InputType()
export default class MessageCreateInput {

    @Field(() => String, {nullable: false})
    @MinLength(1, {
        message: 'message is too short',
    })
    message: string;

    @Field(() => Int, {nullable: false})
    userFrom: number;

    @Field(() => Int, {nullable: false})
    userTo: number;
}