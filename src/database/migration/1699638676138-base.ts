import {MigrationInterface, QueryRunner} from "typeorm"
import * as fs from "fs";

export class Base1699638676138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            fs.readFileSync(process.env.MIGRATIONS_PATH + "/create-table-users.sql").toString()
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            fs.readFileSync(process.env.MIGRATIONS_PATH + "/drop-table-todos.sql").toString()
        );
    }

}
