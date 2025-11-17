// framework nestjs
import { Controller, Get, Param } from "@nestjs/common";
import { EducationalInstitutionService } from "src/modules/consolidate-bachelors/domain/ports/inbound/educational-institution.service";
// own implementations

@Controller('educational-institution')
export class EducationalInstitutionController {
  constructor(
    private readonly educationalInstitutionService: EducationalInstitutionService
  ){}

  @Get('info/:sie')
  getEducationalInstitutionInfo(@Param('sie') sie: number) {
    return this.educationalInstitutionService.getInfoEducationalInstitution(sie)
  }

}