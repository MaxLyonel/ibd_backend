



export abstract class ReportGeneralService {
  // Regular
  abstract generateReportGeneralMasculineRegular(gestionId: string, sie: string): Promise<any>;
  abstract generateReportGeneralFeminineRegular(gestionId: string, sie: string): Promise<any>;
  abstract generateReportConsolidateRegular(gestionId: string, sie: string): Promise<any>;

  // Alternative
  abstract generateReportGeneralMasculineAlternative(gestionId: string, sie: string): Promise<any>;
  abstract generateReportGeneralFeminineAlternative(gestionId: string, sie: string): Promise<any>;
  abstract generateReportConsolidateAlternative(gestionId: string, sie: string): Promise<any>;
}