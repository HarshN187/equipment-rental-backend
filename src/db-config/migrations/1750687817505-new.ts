import { MigrationInterface, QueryRunner } from "typeorm";

export class New1750687817505 implements MigrationInterface {
    name = 'New1750687817505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }

}
