import { MigrationInterface, QueryRunner } from "typeorm";

export class Guess1683588539471 implements MigrationInterface {
    name = 'Guess1683588539471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "guess" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "word" integer NOT NULL, "guesses" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_guess" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "word" integer NOT NULL, "guesses" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_364f83751f24dc9ba29361d579a" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_guess"("id", "word", "guesses", "userId") SELECT "id", "word", "guesses", "userId" FROM "guess"`);
        await queryRunner.query(`DROP TABLE "guess"`);
        await queryRunner.query(`ALTER TABLE "temporary_guess" RENAME TO "guess"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guess" RENAME TO "temporary_guess"`);
        await queryRunner.query(`CREATE TABLE "guess" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "word" integer NOT NULL, "guesses" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "guess"("id", "word", "guesses", "userId") SELECT "id", "word", "guesses", "userId" FROM "temporary_guess"`);
        await queryRunner.query(`DROP TABLE "temporary_guess"`);
        await queryRunner.query(`DROP TABLE "guess"`);
    }

}
