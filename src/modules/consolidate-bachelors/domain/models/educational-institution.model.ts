
export class EducationalInstitution {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly state: any,
    public readonly educationalInstitutionType: any,
    public readonly jurisdiction: any
  ) {}

  static create({
    id,
    name,
    state,
    educationalInstitutionType,
    jurisdiction
  }: {
    id: number,
    name: string,
    state: any,
    educationalInstitutionType: any,
    jurisdiction
  }): EducationalInstitution {
    return new EducationalInstitution(id, name, state, educationalInstitutionType, jurisdiction )
  }
}