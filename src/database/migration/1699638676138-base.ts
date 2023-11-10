import {MigrationInterface, QueryRunner} from "typeorm"
import * as fs from "fs";

export class Base1699638676138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            fs.readFileSync("src/database/migration/create_table_user.sql").toString()
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            fs.readFileSync("src/database/migration/drop_table_user.sql").toString()
        );
    }

}
