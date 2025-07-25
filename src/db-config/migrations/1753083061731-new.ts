import { MigrationInterface, QueryRunner } from "typeorm";

export class New1753083061731 implements MigrationInterface {
    name = 'New1753083061731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_0cafd7959fa42f12d2197464973"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "category_id" TO "cat_id"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" TO "PK_d6317b6c2abd9293df82afc80f6"`);
        await queryRunner.query(`ALTER SEQUENCE "category_category_id_seq" RENAME TO "category_cat_id_seq"`);
        await queryRunner.query(`ALTER TABLE "equipment" RENAME COLUMN "categoryCategoryId" TO "categoryCatId"`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_2413808561adad3c00582cd6db6" FOREIGN KEY ("categoryCatId") REFERENCES "category"("cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_2413808561adad3c00582cd6db6"`);
        await queryRunner.query(`ALTER TABLE "equipment" RENAME COLUMN "categoryCatId" TO "categoryCategoryId"`);
        await queryRunner.query(`ALTER SEQUENCE "category_cat_id_seq" RENAME TO "category_category_id_seq"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME CONSTRAINT "PK_d6317b6c2abd9293df82afc80f6" TO "PK_cc7f32b7ab33c70b9e715afae84"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "cat_id" TO "category_id"`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_0cafd7959fa42f12d2197464973" FOREIGN KEY ("categoryCategoryId") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
