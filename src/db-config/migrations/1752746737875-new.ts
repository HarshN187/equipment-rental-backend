import { MigrationInterface, QueryRunner } from "typeorm";

export class New1752746737875 implements MigrationInterface {
    name = 'New1752746737875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rental" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "quantity"`);
    }

}
