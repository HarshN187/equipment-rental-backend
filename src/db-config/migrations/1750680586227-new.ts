import { MigrationInterface, QueryRunner } from "typeorm";

export class New1750680586227 implements MigrationInterface {
    name = 'New1750680586227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_5c91d10c5ee7afddcb2dbbfbbd0"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "rental" RENAME COLUMN "userId" TO "userUserId"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "userId" TO "userUserId"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_cace4a159ff9f2512dd42373760" TO "PK_758b8ce7c18b9d347461b30228d"`);
        await queryRunner.query(`ALTER SEQUENCE "user_id_seq" RENAME TO "user_user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_08eee6e58eb7fe9c8d3d9db1cf1" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_03e49a79ac4465ca87fcdd00294" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_03e49a79ac4465ca87fcdd00294"`);
        await queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_08eee6e58eb7fe9c8d3d9db1cf1"`);
        await queryRunner.query(`ALTER SEQUENCE "user_user_id_seq" RENAME TO "user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" TO "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "user_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "userUserId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "rental" RENAME COLUMN "userUserId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_5c91d10c5ee7afddcb2dbbfbbd0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
