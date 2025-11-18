import { Public } from "@access-control/infrastructure/adapters/primary/decorators/public.decorator";
import { Controller, Get, HttpException, HttpStatus, Query, Res } from "@nestjs/common";
import type { Response } from "express";
import { ConsolidateBachelorsService } from "src/modules/consolidate-bachelors/domain/ports/inbound/consolidate-bachelors.service";
import { ReportGeneralService } from "src/modules/consolidate-bachelors/domain/ports/outbound/report-general.service";

@Controller('consolidate-bachelors')
export class ConsolidateBachelorsController {
  constructor(
    private readonly consolidateBachelorsService: ConsolidateBachelorsService,
    private readonly reportGeneralService: ReportGeneralService
  ) {}

  // Sub sistema de regular
  @Public()
  @Get('obtain-bachelors-regular')
  async getBachelors(
    @Query() query: any
  ) {
    const { gestionId, sie } = query
    try {
      const result = await this.consolidateBachelorsService.generatePreliminaryCalculationViewRegular(gestionId, sie)
      return {
        status: 'success',
        message: 'Bachilleres destacados obtenidos exitosamente',
        data: result
      }
    } catch(error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al obtener bachilleres destacados'
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @Public()
  @Get('report-femenine-bachelors-regular')
  async getReportGeneralFemenineRegular(
    @Query() query: any,
    @Res() res: Response
  ){
    try {
      const { gestionId, sie } = query
      const pdfBuffer = await this.reportGeneralService.generateReportGeneralFeminineRegular(gestionId, sie)
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="report-general-reg-masculino.pdf"',
        'Content-Length': pdfBuffer.length
      });
      res.send(pdfBuffer);
    } catch(error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al generar el reporte de alternativa'
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @Public()
  @Get('report-masculine-bachelors-regular')
  async getReportGeneralMasculineRegular(
    @Query() query: any,
    @Res() res: Response
  ) {
    try {
      const { gestionId, sie } = query
      const pdfBuffer = await this.reportGeneralService.generateReportGeneralMasculineRegular(gestionId, sie)
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="report-general-reg-masculino.pdf"',
        'Content-Length': pdfBuffer.length
      });
      res.send(pdfBuffer);
    } catch(error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al generar el reporte de alternativa'
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @Public()
  @Get('consolidate-regular')
  async getReportConsolidateRegular(
    @Query() query: any,
    @Res() res: Response
  ){
    try {
      const { gestionId, sie, userId, ibanClose } = query;

      const result = await this.consolidateBachelorsService.consolidationRegular(
        gestionId, sie, userId, ibanClose
      );

      if (result.length !== 0) {
        const pdfBuffer = await this.reportGeneralService.generateReportConsolidateRegular(
          gestionId, sie
        );

        res.set({
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="report-consolidate-regular.pdf"',
          'Content-Length': pdfBuffer.length
        });

        return res.send(pdfBuffer);
      }

      return res.status(200).json({
        status: false,
        message: 'No existen registros para consolidar.'
      });
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al consolidar bachilleres de regular'
      }, HttpStatus.BAD_REQUEST);
    }
  }

  // Sub sistema de alternativa
  @Public()
  @Get('obtain-bachelors-alternative')
  async getBachelorsAlternative(
    @Query() query: any
  ) {
    const { gestionId, sie } = query
    try {
      const result = await this.consolidateBachelorsService.generatePreliminaryCalcultaionViewAlternative(gestionId, sie)
      return {
        status: 'success',
        message: 'Bachilleres destacados de alternativa obtenidos exitosamente',
        data: result
      }
    } catch(error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al obtener bachilleres destacados'
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @Public()
  @Get('report-femenine-bachelors-alternative')
  async getReportGeneralFemenineAlternative(
    @Query() query: any,
    @Res() res: Response
  ) {
    try {
      const { gestionId, sie } = query
      const pdfBuffer = await this.reportGeneralService.generateReportGeneralFeminineAlternative(gestionId, sie)
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposittion': 'attachment; filename="report-general-alt-masculino.pdf"',
        'Content-Length': pdfBuffer.length
      });
      res.send(pdfBuffer);
    } catch(error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al generar el reporte de alternativa'
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @Public()
  @Get('report-masculine-bachelors-alternative')
  async getReportGeneralMasculineAlternative(
    @Query() query: any,
    @Res() res: Response
  ) {
    try {
      const { gestionId, sie  } = query
      const pdfBuffer = await this.reportGeneralService.generateReportGeneralMasculineAlternative(gestionId, sie)
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="report-general-alt-femenino.pdf"',
        'Content-Length': pdfBuffer.length
      })
    } catch(error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al generar el reporte masculino de alternativa'
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @Public()
  @Get('consolidate-alternative')
  async getReportConsolidateAlternative(
    @Query() query: any,
    @Res() res: Response
  ){
    try {
      const { gestionId, sie, userId, ibanClose } = query;

      const result = await this.consolidateBachelorsService.consolidationAlternative(
        gestionId, sie, userId, ibanClose
      );

      if (result.length !== 0) {
        const pdfBuffer = await this.reportGeneralService.generateReportConsolidateAlternative(
          gestionId, sie
        );

        res.set({
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="report-consolidate-alternative.pdf"',
          'Content-Length': pdfBuffer.length
        });

        return res.send(pdfBuffer);
      }

      return res.status(200).json({
        status: false,
        message: 'No existen registros para consolidar.'
      });
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al consolidar bachilleres de regular'
      }, HttpStatus.BAD_REQUEST);
    }
  }
}