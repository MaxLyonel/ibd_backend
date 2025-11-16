export class Operative {
  constructor (
    public readonly id: number,
    public readonly dateUpdateDirIni: Date,
    public readonly dateUpdateDirEnd: Date,
    public readonly dateBachelorIni: Date,
    public readonly dateBachelorEnd: Date,
    public readonly gestionId: number
  ) {}


  static create({
    id,
    dateUpdateDirIni,
    dateUpdateDirEnd,
    dateBachelorIni,
    dateBachelorEnd,
    gestionId
  }: {
    id: number
    dateUpdateDirIni: Date,
    dateUpdateDirEnd: Date,
    dateBachelorIni: Date,
    dateBachelorEnd: Date,
    gestionId: number
  }): Operative {
    return new Operative(
      id,
      dateUpdateDirIni,
      dateUpdateDirEnd,
      dateBachelorIni,
      dateBachelorEnd,
      gestionId
    )
  }
}