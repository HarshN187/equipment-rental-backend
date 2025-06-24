import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimaryKeyChange1750746933438 implements MigrationInterface {
    name = 'PrimaryKeyChange1750746933438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_e9a70380dd18202c3f3fe854b08"`);
        await queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_700f1f35adb0e5356727cc4bbea"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "id" TO "category_id"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" TO "PK_cc7f32b7ab33c70b9e715afae84"`);
        await queryRunner.query(`ALTER SEQUENCE "category_id_seq" RENAME TO "category_category_id_seq"`);
        await queryRunner.query(`ALTER TABLE "rental" RENAME COLUMN "equipmentId" TO "equipmentEId"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "PK_0722e1b9d6eb19f5874c1678740"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "e_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "PK_525b5e6d470921811c2f207e1a6" PRIMARY KEY ("e_id")`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "categoryCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_0cafd7959fa42f12d2197464973" FOREIGN KEY ("categoryCategoryId") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_b027eb5ea1530a5d7a17101a99f" FOREIGN KEY ("equipmentEId") REFERENCES "equipment"("e_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_b027eb5ea1530a5d7a17101a99f"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_0cafd7959fa42f12d2197464973"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "categoryCategoryId"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "PK_525b5e6d470921811c2f207e1a6"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "e_id"`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "PK_0722e1b9d6eb19f5874c1678740" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rental" RENAME COLUMN "equipmentEId" TO "equipmentId"`);
        await queryRunner.query(`ALTER SEQUENCE "category_category_id_seq" RENAME TO "category_id_seq"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" TO "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "category_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_700f1f35adb0e5356727cc4bbea" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_e9a70380dd18202c3f3fe854b08" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
