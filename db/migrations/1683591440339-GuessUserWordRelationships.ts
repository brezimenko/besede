import { MigrationInterface, QueryRunner } from "typeorm";

export class GuessUserWordRelationships1683591440339 implements MigrationInterface {
    name = 'GuessUserWordRelationships1683591440339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_guess" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "wordId" integer NOT NULL, "guesses" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_364f83751f24dc9ba29361d579a" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_guess"("id", "wordId", "guesses", "userId") SELECT "id", "word", "guesses", "userId" FROM "guess"`);
        await queryRunner.query(`DROP TABLE "guess"`);
        await queryRunner.query(`ALTER TABLE "temporary_guess" RENAME TO "guess"`);
        await queryRunner.query(`CREATE TABLE "temporary_guess" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "wordId" integer, "guesses" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_364f83751f24dc9ba29361d579a" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_guess"("id", "wordId", "guesses", "userId") SELECT "id", "wordId", "guesses", "userId" FROM "guess"`);
        await queryRunner.query(`DROP TABLE "guess"`);
        await queryRunner.query(`ALTER TABLE "temporary_guess" RENAME TO "guess"`);
        await queryRunner.query(`CREATE TABLE "temporary_guess" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "wordId" integer, "guesses" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_364f83751f24dc9ba29361d579a" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_d1352e45dd925d1b387f984a637" FOREIGN KEY ("wordId") REFERENCES "word" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_guess"("id", "wordId", "guesses", "userId") SELECT "id", "wordId", "guesses", "userId" FROM "guess"`);
        await queryRunner.query(`DROP TABLE "guess"`);
        await queryRunner.query(`ALTER TABLE "temporary_guess" RENAME TO "guess"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guess" RENAME TO "temporary_guess"`);
        await queryRunner.query(`CREATE TABLE "guess" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "wordId" integer, "guesses" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_364f83751f24dc9ba29361d579a" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "guess"("id", "wordId", "guesses", "userId") SELECT "id", "wordId", "guesses", "userId" FROM "temporary_guess"`);
        await queryRunner.query(`DROP TABLE "temporary_guess"`);
        await queryRunner.query(`ALTER TABLE "guess" RENAME TO "temporary_guess"`);
        await queryRunner.query(`CREATE TABLE "guess" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "wordId" integer NOT NULL, "guesses" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_364f83751f24dc9ba29361d579a" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "guess"("id", "wordId", "guesses", "userId") SELECT "id", "wordId", "guesses", "userId" FROM "temporary_guess"`);
        await queryRunner.query(`DROP TABLE "temporary_guess"`);
        await queryRunner.query(`ALTER TABLE "guess" RENAME TO "temporary_guess"`);
        await queryRunner.query(`CREATE TABLE "guess" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "word" integer NOT NULL, "guesses" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_364f83751f24dc9ba29361d579a" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "guess"("id", "word", "guesses", "userId") SELECT "id", "wordId", "guesses", "userId" FROM "temporary_guess"`);
        await queryRunner.query(`DROP TABLE "temporary_guess"`);
    }

}
