import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import User from "./User";

@Entity({name: "message"})
@ObjectType()
export default class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(() => ID, {name: "id"})
    id: number;

    @Field(() => String, {name: "message"})
    @Column({name: "message"})
    message: string;

    @Field(() => User!, {name: "fromUser"})
    @JoinColumn({name: "from_user_id"})
    @ManyToOne(() => User, (user) => user.messagesReceived, {eager: true})
    fromUser: User;

    @Field(() => User!, {name: "toUser"})
    @JoinColumn({name: "to_user_id"})
    @ManyToOne(() => User, (user) => user.messagesSent, {eager: true})
    toUser: User;

    @Field(() => Date, {name: "insertDate", nullable: true})
    @Column({name: "insert_date"})
    insertDate: Date;
}