import { MigrationInterface, QueryRunner } from "typeorm";

export class createCarTable1667488908380 implements MigrationInterface {
    name = 'createCarTable1667488908380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "marca" character varying NOT NULL, "modelo" character varying NOT NULL, "year_fabrication" integer NOT NULL, "year_model" integer NOT NULL, "shift" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "car"`);
    }

}
