export abstract class ConsolidateBachelorsRepository {
  // Sub sistema de Educación regular
  abstract generatePreliminaryCalculationViewRegular(gestionId: number, sie: number): Promise<any>;
  abstract generateReportAndAffidavitRegular(gestionId: number, sie: number): Promise<any>;
  abstract consolidationRegular(gestionId: number, sie: number, userId: number, ibanClose: string): Promise<any>;

  // Sub sistema de Educación alternativa
  abstract generatePreliminaryCalculationViewAlternative(gestionId: number, sie: number): Promise<any>;
  abstract generateReportAndAffidavitAlternative(gestionId: number, sie: number): Promise<any>;
  abstract consolidateAlternative(gestionId: number, sie: number, userId: number, ibanClose: string): Promise<any>;
}