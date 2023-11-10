import {MigrationInterface, QueryRunner} from "typeorm"
import * as fs from "fs";

export class Base1699638676138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            fs.readFileSync("src/database/migration/create-table-user.sql").toString()
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            fs.readFileSync("src/database/migration//drop-table-user.sql").toString()
        );
    }

}
