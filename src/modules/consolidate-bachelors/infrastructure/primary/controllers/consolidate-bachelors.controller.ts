import { Public } from "@access-control/infrastructure/adapters/primary/decorators/public.decorator";
import { Controller, Get, HttpException, HttpStatus, Query } from "@nestjs/common";
import { ConsolidateBachelorsService } from "src/modules/consolidate-bachelors/domain/ports/inbound/consolidate-bachelors.service";




@Controller('consolidate-bachelors')
export class ConsolidateBachelorsController {
  constructor(
    private readonly consolidateBachelorsService: ConsolidateBachelorsService
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

}