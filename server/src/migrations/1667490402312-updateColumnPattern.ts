import { MigrationInterface, QueryRunner } from "typeorm";

export class updateColumnPattern1667490402312 implements MigrationInterface {
    name = 'updateColumnPattern1667490402312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "marca"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "modelo"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "brand" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD "model" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "modelo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD "marca" character varying NOT NULL`);
    }

}
