import User from "../entity/User";
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import ApplicationError from "../error/ApplicationError";
import Message from "../entity/Message";
import MessageCreateInput from "../input/MessageCreateInput";

@Resolver()
export class MessageResolver {
    @Query(() => Message)
    async getMessage(@Arg("id") id: number) {
        const message = await Message.findOne({where: {id: id}});
        return message;
    }

    @Query(() => [User])
    async getMessages(@Arg("withId") withId: number): Promise<Array<Message>> {
        return await Message.createQueryBuilder("user").where("message.toUser.id = :toUser or message.fromUser.id = :fromUser",
            {
                toUser: withId,
                fromUser: withId
            }
        ).getMany();
    }

    @Mutation(() => Message, {nullable: true})
    async addMessage(@Arg("message") messageIn: MessageCreateInput): Promise<Message | null> {
        console.log("ciao")
        try {
            const userFrom = await User.findOne({where: {id: messageIn.userFrom}});
            const userTo = await User.findOne({where: {id: messageIn.userTo}});
            const message = Message.create({
                fromUser: userFrom!,
                toUser: userTo!,
                message: messageIn.message
            });
            console.log(message);
            return await message.save();
        } catch (error) {
            throw new ApplicationError("Unable to save data: " + error);
        }
    }

    @Mutation(() => Boolean, {nullable: false})
    async deleteMessage(@Arg("id") id: number): Promise<boolean> {
        const message = await Message.findOne({where: {id}});
        if (!message) {
            throw new Error("User not found :|");
        }
        await message.remove();
        return true;
    }

}
