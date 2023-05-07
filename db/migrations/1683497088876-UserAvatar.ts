import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAvatar1683497088876 implements MigrationInterface {
    name = 'UserAvatar1683497088876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "username" varchar, "avatar" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "username") SELECT "id", "email", "password", "username" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "username" varchar)`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "username") SELECT "id", "email", "password", "username" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
