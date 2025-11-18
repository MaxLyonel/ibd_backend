import { Module } from "@nestjs/common";
import { ConsolidateBachelorsController } from "./infrastructure/primary/controllers/consolidate-bachelors.controller";
import { ConsolidateBachelorsServiceImpl } from "./application/services/consolidate-bachelors.service.impl";
import { ConsolidateBachelorsService } from "./domain/ports/inbound/consolidate-bachelors.service";
import { ConsolidateBachelorsRepository } from "./domain/ports/outbound/consolidate-bachelors.repository";
import { ConsolidateBachelorsRepositoryImpl } from "./infrastructure/secondary/persistence/repositories/consolidate-bachelors.repository.impl";
import { EducationalInstitutionRepository } from "./domain/ports/outbound/educational-institution.repository";
import { EducationalInstitutionRepositoryImpl } from "./infrastructure/secondary/persistence/repositories/educational-institution.repository.impl";
import { EducationalInstitutionService } from "./domain/ports/inbound/educational-institution.service";
import { EducationalInstitutionImpl } from "./application/services/educational-institution.service.impl";
import { PlaceTypeEntity } from "@access-control/infrastructure/adapters/secondary/persistence/entities/place-type.entity";
import { TeacherEntity } from "@access-control/infrastructure/adapters/secondary/persistence/entities/teacher.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EducationalInstitutionController } from "./infrastructure/primary/controllers/educational-institution.controller";
import { EducationalInstitutionEntity } from "./infrastructure/secondary/persistence/entities/educational-institution.entity";
import { GeographicJurisdictionEntity } from "./infrastructure/secondary/persistence/entities/geographic-jurisdiction.entity";
import { ReportService } from "./domain/ports/outbound/report.service";
import { ReportServiceImpl } from "./infrastructure/secondary/service/report.service.impl";
import { ReportGeneralService } from "./domain/ports/outbound/report-general.service";
import { ReportGeneralServiceImpl } from "./infrastructure/secondary/service/report-general.impl";
import { HttpModule } from "@nestjs/axios";





@Module({
  controllers: [ConsolidateBachelorsController, EducationalInstitutionController],
  providers: [
    {
      provide: ConsolidateBachelorsService,
      useClass: ConsolidateBachelorsServiceImpl
    },
    {
      provide: ConsolidateBachelorsRepository,
      useClass: ConsolidateBachelorsRepositoryImpl
    },
    {
      provide: EducationalInstitutionRepository,
      useClass: EducationalInstitutionRepositoryImpl
    },
    {
      provide: EducationalInstitutionService,
      useClass: EducationalInstitutionImpl
    },
    {
      provide: ReportService,
      useClass: ReportServiceImpl
    },
    {
      provide: ReportGeneralService,
      useClass: ReportGeneralServiceImpl
    }
  ],
  imports: [
    TypeOrmModule.forFeature(
      [
        EducationalInstitutionEntity,
        GeographicJurisdictionEntity,
        PlaceTypeEntity,
        TeacherEntity,
      ], 'ibd'),
    HttpModule
  ],
  exports: []
})
export class ConsolidateBacherlorsModule {}