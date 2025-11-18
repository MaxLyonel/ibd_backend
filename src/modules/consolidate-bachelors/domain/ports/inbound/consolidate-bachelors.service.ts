

export abstract class ConsolidateBachelorsService {
  // Sub sistema de educación Regular
  abstract generatePreliminaryCalculationViewRegular(gestionId: number, sie: number): Promise<any>;
  abstract generateReportAndAffidavitRegular(gestionId: number, sie: number): Promise<any>;
  abstract consolidationRegular(gestionId: number, sie: number, userId: number, ibanClose: string): Promise<any>;

  // Sub sistema de educación Alternativa
  abstract generatePreliminaryCalcultaionViewAlternative(gestionId: number, sie: number): Promise<any>;
  abstract generateReportAndAffidavitAlternative(gestionId: number, sie: number): Promise<any>;
  abstract consolidationAlternative(gestionId: number, sie: number, userId: number, ibanClose: string): Promise<any>;

}