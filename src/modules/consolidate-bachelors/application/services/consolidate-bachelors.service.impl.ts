import { Injectable } from '@nestjs/common';
import { ConsolidateBachelorsService } from '../../domain/ports/inbound/consolidate-bachelors.service';
import { ConsolidateBachelorsRepository } from '../../domain/ports/outbound/consolidate-bachelors.repository';



@Injectable()
export class ConsolidateBachelorsServiceImpl implements ConsolidateBachelorsService {

  constructor(
    private readonly consolidateBachelorsRepository: ConsolidateBachelorsRepository
  ){}

  async generatePreliminaryCalculationViewRegular(gestionId: number, sie: number): Promise<any> {
    const result = await this.consolidateBachelorsRepository.generatePreliminaryCalculationViewRegular(gestionId, sie);
    return result
  }

  async generateReportAndAffidavitRegular(gestionId: number, sie: number): Promise<any> {
    const result = await this.generateReportAndAffidavitRegular(gestionId, sie);
    return result
  }

  async consolidationRegular(gestionId: number, sie: number, userId: number, ibanClose: string): Promise<any> {
    const result = await this.consolidationRegular(gestionId, sie, userId, ibanClose)
    return result
  }

}