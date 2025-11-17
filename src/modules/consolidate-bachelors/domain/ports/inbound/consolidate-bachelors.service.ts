

export abstract class ConsolidateBachelorsService {
  abstract generatePreliminaryCalculationViewRegular(gestionId: number, sie: number): Promise<any>;
  abstract generateReportAndAffidavitRegular(gestionId: number, sie: number): Promise<any>;
  abstract consolidationRegular(gestionId: number, sie: number, userId: number, ibanClose: string): Promise<any>;
}