import User from "../entity/User";
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import ApplicationError from "../error/ApplicationError";
import Message from "../entity/Message";
import MessageCreateInput from "../input/MessageCreateInput";

@Resolver()
export class MessageResolver {
    @Query(() => Message)
    async getMessage(@Arg("id") id: number) {
        return await Message.findOne({where: {id: id}});
    }

    @Query(() => [Message])
    async getMessages(@Arg("fromId") fromId: number, @Arg("toId") toId: number): Promise<Array<Message>> {
        return await Message.createQueryBuilder()
            .select("message")
            .from(Message, "message")
            .leftJoinAndSelect("message.fromUser", "fromUser")
            .leftJoinAndSelect("message.toUser", "toUser")
            .where("message.toUser.id in  (:...ids) and message.fromUser.id in (:...ids)",
                {
                    ids: [toId, fromId],
                }
            )
            .orderBy("message.insertDate", "ASC")
            .getMany();
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
            const newMessage = await message.save()
            return await Message.findOne({where: {id: newMessage.id}});
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
