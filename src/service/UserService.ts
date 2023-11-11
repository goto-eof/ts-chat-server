import {Repository} from "typeorm";
import User from "../entity/User";
import {AppDataSource} from "../config/DataSource";

export class UserService {
    constructor(public userRepository: Repository<User>) {
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.createQueryBuilder('user')
            .select("user")
            .addSelect('user.password')
            .select()
            .where('email = :email', {email})
            .getOne();

        return user;
    }
}

export const userService = new UserService(AppDataSource.getRepository(User));