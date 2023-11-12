import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import Message from "../entity/Message";
import MessageCreateInput from "../input/MessageCreateInput";
import AuthGuard from "../decorator/AuthGuard";
import {messageService} from "../service/MessageService";
import {MyContext} from "../index";

@Resolver()
export class MessageResolver {
    @Query(() => Message)
    @AuthGuard
    async getMessage(@Ctx() context: MyContext, @Arg("id") id: number) {
        return await messageService.getMessage(id);
    }

    @Query(() => [Message])
    @AuthGuard
    async getMessages(@Ctx() context: MyContext, @Arg("fromId") fromId: number, @Arg("toId") toId: number): Promise<Array<Message>> {
        return await messageService.getMessages(toId, fromId);
    }

    @Mutation(() => Message, {nullable: true})
    @AuthGuard
    async addMessage(@Ctx() context: MyContext, @Arg("message") messageIn: MessageCreateInput): Promise<Message | null> {
        return await messageService.createMessage(messageIn, context.io);
    }

    @Mutation(() => Boolean, {nullable: false})
    @AuthGuard
    async deleteMessage(@Ctx() context: MyContext, @Arg("id") id: number): Promise<boolean> {
        return await messageService.deleteMessage(id);
    }

}
