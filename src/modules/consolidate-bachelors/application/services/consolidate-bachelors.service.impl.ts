import { Injectable } from '@nestjs/common';
import { ConsolidateBachelorsService } from '../../domain/ports/inbound/consolidate-bachelors.service';
import { ConsolidateBachelorsRepository } from '../../domain/ports/outbound/consolidate-bachelors.repository';



@Injectable()
export class ConsolidateBachelorsServiceImpl implements ConsolidateBachelorsService {

  constructor(
    private readonly consolidateBachelorsRepository: ConsolidateBachelorsRepository
  ){}

  // Sub sistema de educación regular
  async generatePreliminaryCalculationViewRegular(gestionId: number, sie: number): Promise<any> {
    const result = await this.consolidateBachelorsRepository.generatePreliminaryCalculationViewRegular(gestionId, sie);
    return result
  }

  async generateReportAndAffidavitRegular(gestionId: number, sie: number): Promise<any> {
    const result = await this.consolidateBachelorsRepository.generateReportAndAffidavitAlternative(gestionId, sie);
    return result
  }

  async consolidationRegular(gestionId: number, sie: number, userId: number, ibanClose: string): Promise<any> {
    const result = await this.consolidateBachelorsRepository.consolidationRegular(gestionId, sie, userId, ibanClose)
    return result
  }

  // Sub sistema de educación alternativa
  async generatePreliminaryCalcultaionViewAlternative(gestionId: number, sie: number): Promise<any> {
    const result = await this.consolidateBachelorsRepository.generatePreliminaryCalculationViewAlternative(gestionId, sie);
    return result
  }

  async generateReportAndAffidavitAlternative(gestionId: number, sie: number): Promise<any> {
    const result = await this.consolidateBachelorsRepository.generatePreliminaryCalculationViewAlternative(gestionId, sie)
    return result
  }

  async consolidationAlternative(gestionId: number, sie: number, userId: number, ibanClose: string): Promise<any> {
    const result = await this.consolidateBachelorsRepository.consolidateAlternative(gestionId, sie, userId, ibanClose)
    return result
  }

}