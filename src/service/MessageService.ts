import {Repository} from "typeorm";
import {AppDataSource} from "../config/DataSource";
import Message from "../entity/Message";
import {GraphQLError} from "graphql";
import MessageCreateInput from "../input/MessageCreateInput";
import {Server} from "socket.io";

export class MessageService {
    constructor(public userRepository: Repository<Message>) {
    }

    async getMessage(id: number) {
        return await Message.findOne({where: {id: id}});
    }

    async getMessages(toId: number, fromId: number) {
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

    async createMessage(messageIn: MessageCreateInput, io: Server) {
        try {
            const message = Message.create({
                fromUser: {id: messageIn.userFrom},
                toUser: {id: messageIn.userTo},
                message: messageIn.message
            });
            console.log(message);
            const newMessage = await message.save()
            if (io) {
                io.to(`${messageIn.userTo}`).emit('message', {
                    message,
                    userFrom: messageIn.userFrom,
                    userTo: messageIn.userTo
                })
            }
            return await Message.findOne({where: {id: newMessage.id}});
        } catch (error) {
            throw new GraphQLError("Unable to save data: " + error);
        }
    }

    async deleteMessage(id: number) {
        const message = await Message.findOne({where: {id}});
        if (!message) {
            throw new Error("User not found :|");
        }
        await message.remove();
        return true;
    }
}

export const messageService = new MessageService(AppDataSource.getRepository(Message));