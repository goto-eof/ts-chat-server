import {Arg, Mutation, Query, Resolver} from "type-graphql";
import Message from "../entity/Message";
import MessageCreateInput from "../input/MessageCreateInput";
import AuthGuard from "../decorator/AuthGuard";
import {messageService} from "../service/MessageService";

@Resolver()
export class MessageResolver {
    @Query(() => Message)
    @AuthGuard
    async getMessage(@Arg("id") id: number) {
        return await messageService.getMessage(id);
    }

    @Query(() => [Message])
    @AuthGuard
    async getMessages(@Arg("fromId") fromId: number, @Arg("toId") toId: number): Promise<Array<Message>> {
        return await messageService.getMessages(toId, fromId);
    }

    @Mutation(() => Message, {nullable: true})
    @AuthGuard
    async addMessage(@Arg("message") messageIn: MessageCreateInput): Promise<Message | null> {
        return await messageService.createMessage(messageIn);
    }

    @Mutation(() => Boolean, {nullable: false})
    @AuthGuard
    async deleteMessage(@Arg("id") id: number): Promise<boolean> {
        return await messageService.deleteMessage(id);
    }

}
