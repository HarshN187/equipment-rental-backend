import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1750662675721 implements MigrationInterface {
    name = 'InitialMigration1750662675721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_e9a70380dd18202c3f3fe854b08" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_e9a70380dd18202c3f3fe854b08"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "categoryId"`);
    }

}
