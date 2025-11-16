import { MigrationInterface, QueryRunner } from "typeorm";

export class Actions1763302947516 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE ibd.acciones (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR,
                creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
