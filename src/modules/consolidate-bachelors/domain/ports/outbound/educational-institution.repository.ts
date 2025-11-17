
export abstract class EducationalInstitutionRepository {
  abstract findBySie(id: number): Promise<any | null>;
}