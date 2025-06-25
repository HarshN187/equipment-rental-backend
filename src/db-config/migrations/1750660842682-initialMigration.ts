import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1750660842682 implements MigrationInterface {
    name = 'InitialMigration1750660842682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_5c91d10c5ee7afddcb2dbbfbbd0"`);
        await queryRunner.query(`ALTER TABLE "rental" RENAME COLUMN "userId" TO "userAddressId"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "id" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_cace4a159ff9f2512dd42373760" TO "PK_302d96673413455481d5ff4022a"`);
        await queryRunner.query(`ALTER SEQUENCE "user_id_seq" RENAME TO "user_address_id_seq"`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zipcode" character varying NOT NULL, "userAddressId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_9c37c449d873b07a58161e51307" FOREIGN KEY ("userAddressId") REFERENCES "user"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_a759b714ad493c88fb0d2eefed5" FOREIGN KEY ("userAddressId") REFERENCES "user"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_a759b714ad493c88fb0d2eefed5"`);
        await queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_9c37c449d873b07a58161e51307"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`ALTER SEQUENCE "user_address_id_seq" RENAME TO "user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_302d96673413455481d5ff4022a" TO "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "address_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "rental" RENAME COLUMN "userAddressId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_5c91d10c5ee7afddcb2dbbfbbd0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
