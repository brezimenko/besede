import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1683491260961 implements MigrationInterface {
    name = 'InitialMigration1683491260961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "word" varchar NOT NULL, "normalizedWord" varchar NOT NULL, "synonym" varchar, "definition" varchar, "examples" varchar, "createdAt" varchar NOT NULL, "updatedAt" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "word"`);
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
