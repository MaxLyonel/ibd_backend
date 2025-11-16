import { MigrationInterface, QueryRunner } from "typeorm";

export class Operative1763297768331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE ibd.operativo (
                id SERIAL PRIMARY KEY,
                fec_act_dir_ini TIMESTAMP,
                fec_act_dir_fin TIMESTAMP,
                fec_bachiller_ini TIMESTAMP,
                fec_bachiller_fin TIMESTAMP,
                gestion_id INT,
                es_activo BOOLEAN DEFAULT TRUE
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
