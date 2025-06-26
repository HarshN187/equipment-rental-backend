import { MigrationInterface, QueryRunner } from "typeorm";

export class New1750930872632 implements MigrationInterface {
    name = 'New1750930872632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_permission" DROP CONSTRAINT "FK_fd9adc22bf0739d6298a1f5e7a2"`);
        await queryRunner.query(`ALTER TABLE "roles_permission" DROP CONSTRAINT "FK_e2510f86dbd7ca9ebfe6b2a4997"`);
        await queryRunner.query(`ALTER TABLE "roles_permission" DROP COLUMN "roleIdId"`);
        await queryRunner.query(`ALTER TABLE "roles_permission" DROP COLUMN "permissionIdId"`);
        await queryRunner.query(`ALTER TABLE "roles_permission" ADD "roleId" integer`);
        await queryRunner.query(`ALTER TABLE "roles_permission" ADD "permissionId" integer`);
        await queryRunner.query(`ALTER TABLE "roles_permission" ADD CONSTRAINT "Roles_Permission" UNIQUE ("roleId", "permissionId")`);
        await queryRunner.query(`ALTER TABLE "roles_permission" ADD CONSTRAINT "FK_22cfa7cd3cf619a03fda9961e06" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permission" ADD CONSTRAINT "FK_58ff21a58854a7efb0d8248f560" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_permission" DROP CONSTRAINT "FK_58ff21a58854a7efb0d8248f560"`);
        await queryRunner.query(`ALTER TABLE "roles_permission" DROP CONSTRAINT "FK_22cfa7cd3cf619a03fda9961e06"`);
        await queryRunner.query(`ALTER TABLE "roles_permission" DROP CONSTRAINT "Roles_Permission"`);
        await queryRunner.query(`ALTER TABLE "roles_permission" DROP COLUMN "permissionId"`);
        await queryRunner.query(`ALTER TABLE "roles_permission" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "roles_permission" ADD "permissionIdId" integer`);
        await queryRunner.query(`ALTER TABLE "roles_permission" ADD "roleIdId" integer`);
        await queryRunner.query(`ALTER TABLE "roles_permission" ADD CONSTRAINT "FK_e2510f86dbd7ca9ebfe6b2a4997" FOREIGN KEY ("permissionIdId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permission" ADD CONSTRAINT "FK_fd9adc22bf0739d6298a1f5e7a2" FOREIGN KEY ("roleIdId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
