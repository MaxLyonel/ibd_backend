import { Inject, Injectable } from '@nestjs/common';
import { ConsolidateBachelorsRepository } from '../../../../domain/ports/outbound/consolidate-bachelors.repository';
import { DataSource } from 'typeorm';




@Injectable()
export class ConsolidateBachelorsRepositoryImpl implements ConsolidateBachelorsRepository {

  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
  }

  async generatePreliminaryCalculationViewRegular(gestionId: number, sie: number): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      const gestion = gestionId.toString();
      const sieStr = sie.toString();
      const sql = `
        SELECT *
        FROM dblink(
          'dbname=sie_produccion host=100.0.100.56 port=5433 user=usr_destacado password=U6e3s74acD0',
          'SELECT * FROM public.sp_genera_regular_bachiller_destacado_vista(''${gestion}'',''${sieStr}'')'
        ) AS resultado (
          genero character varying,
          codigo_rude character varying,
          carnet_identidad character varying,
          complemento character varying,
          paterno character varying,
          materno character varying,
          nombre character varying,
          turno character varying,
          paralelo character varying,
          nota_cuant_prom numeric
        );
      `;
      const result = await queryRunner.query(sql);
      return result;
    } catch(error) {
      throw error
    } finally {
      await queryRunner.release();
    }
  }

  async generateReportAndAffidavitRegular(gestionId: number, sie: number): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();

      const gestion = gestionId.toString();
      const sieStr = sie.toString();

      const sql = `
        SELECT *
        FROM dblink(
          'dbname=sie_produccion host=100.0.100.56 port=5433 user=usr_destacado password=U6e3s74acD0',
          'SELECT * FROM public.sp_genera_regular_bachiller_destacado_rep(''${gestion}'',''${sieStr}'')'
        ) AS resultado (
          nivel_gen text,
          turno character varying,
          paralelo character varying,
          genero character varying,
          codigo_rude character varying,
          nombres text,
          asignatura_tipo_id integer,
          asignatura character varying,
          nota_cuantitativa numeric,
          nota_cuant_prom numeric,
          prom5to numeric,
          prom4to numeric,
          prom3to numeric,
          prom2to numeric,
          prom1to numeric,
          ban smallint
        );
      `;

      const result = await queryRunner.query(sql);
      return result;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async consolidationRegular(gestionId: number, sie: number, userId: number, ibanClose: string): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect()
      const result = await queryRunner.query(
        `select * from public.sp_genera_regular_bachiller_destacado($1, $2, $3, $4)`,
        [gestionId.toString(), sie.toString(), userId.toString(), ibanClose.toString()]
      );
      return result
    } catch(error) {
      throw error
    }
  }

}