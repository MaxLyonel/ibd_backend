

export abstract class EducationalInstitutionService {
  abstract getInfoEducationalInstitution(sie: number): Promise<any | null>;
}