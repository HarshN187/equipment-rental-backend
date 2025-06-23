import { MigrationInterface, QueryRunner } from "typeorm";

export class New1750679833025 implements MigrationInterface {
    name = 'New1750679833025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "address_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" TO "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER SEQUENCE "address_address_id_seq" RENAME TO "address_id_seq"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER SEQUENCE "address_id_seq" RENAME TO "address_address_id_seq"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" TO "PK_db4aae0a059fd4ef7709cb802b0"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "id" TO "address_id"`);
    }

}
