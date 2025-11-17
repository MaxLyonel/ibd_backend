import { Public } from "@access-control/infrastructure/adapters/primary/decorators/public.decorator";
import { Controller, Get, HttpException, HttpStatus, Query, Res } from "@nestjs/common";
import type { Response } from "express";
import { ConsolidateBachelorsService } from "src/modules/consolidate-bachelors/domain/ports/inbound/consolidate-bachelors.service";
import { ReportService } from "src/modules/consolidate-bachelors/domain/ports/outbound/report.service";




@Controller('consolidate-bachelors')
export class ConsolidateBachelorsController {
  constructor(
    private readonly consolidateBachelorsService: ConsolidateBachelorsService,
    private readonly reportService: ReportService
  ) {}


  @Public()
  @Get('obtain')
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
  @Get('report')
  async getReport(
    @Query() query: any,
    @Res() res: Response
  ){
    const { gestionId, sie } = query
    try {
      // const result = await this.consolidateBachelorsService.generateReportAndAffidavitRegular(gestionId, sie)
      await this.reportService.generateDeclaracionJurada({}, res)
    } catch(error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al generar el reporte de revision',
      }, HttpStatus.BAD_REQUEST)
    }
  }


  // @Public()
  // @Get('print/:preRegistrationId')
  // async printPreRegistration(
  //   @Param('preRegistrationId', ParseIntPipe) preRegistrationId: number,
  //   @Res() res: Response
  // ) {
  //   try {
  //     const response = await this.getPreRegistrationInfo(preRegistrationId)
  //     await this.pdfService.generateRegistrationForm(response.data, res)
  //   } catch(error) {
  //     if(!res.headersSent) {
  //       res.status(HttpStatus.BAD_REQUEST).json({
  //         status: 'error',
  //         message: error.message || 'Error al descargar PDF'
  //       })
  //     } else {
  //       console.error('Error después de enviar headers PDF')
  //     }
  //   }
  // }

}