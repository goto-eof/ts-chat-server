import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import Message from "./Message";

@Entity({name: "user"})
@ObjectType()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(() => ID, {name: "id"})
    id: number;

    @Field(() => String, {name: "firstName"})
    @Column({name: "first_name"})
    firstName: string;

    @Field(() => String, {name: "lastName"})
    @Column({name: "last_name"})
    lastName: string;

    @Field(() => String)
    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    @Field(() => String)
    email: string;

    @OneToMany(() => Message, (message) => message.fromUser)
    messagesReceived: Message[]

    @OneToMany(() => Message, (message) => message.toUser)
    messagesSent: Message[]
}