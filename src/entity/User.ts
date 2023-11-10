import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

@Entity({name: "user"})
@ObjectType()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(() => ID, {name: "id"})
    id: number;

    @Field(() => String, {name: "firstName"})
    @Column({name: "first_name"})
    firstName: string;

    @Field(() => String)
    @Column({name: "last_name"})
    lastName: string;

    @Field(() => String)
    @Column()
    username: string;

    @Column()
    password: string;
}