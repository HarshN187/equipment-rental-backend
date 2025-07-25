import { MigrationInterface, QueryRunner } from "typeorm";

export class New1752670289823 implements MigrationInterface {
    name = 'New1752670289823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" ADD "total_quntity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "available_quntity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "available_quntity"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "total_quntity"`);
    }

}
