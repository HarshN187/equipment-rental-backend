import { MigrationInterface, QueryRunner } from "typeorm";

export class New1750930635587 implements MigrationInterface {
    name = 'New1750930635587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "name" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "name" integer NOT NULL`);
    }

}
