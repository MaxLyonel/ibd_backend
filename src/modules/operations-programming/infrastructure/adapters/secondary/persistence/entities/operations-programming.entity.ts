// import { Operative } from "src/modules/operations-programming/domain/operative.model";
import { Operative } from "../../../../../domain/models/operative.model"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({ schema: 'ibd', name: 'operativo'})
export class OperativeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'fec_act_dir_ini'})
  dateUpdateDirIni: Date

  @Column({ name: 'fec_act_dir_fin'})
  dateUpdateDirEnd: Date

  @Column({ name: 'fec_bachiller_ini'})
  dateBachelorIni: Date

  @Column({ name: 'fec_bachiller_fin'})
  dateBachelorEnd: Date

  @Column({ name: 'gestion_id'})
  gestionId: number


  static toDomain(entity: OperativeEntity): Operative {
    return new Operative(
      entity.id,
      entity.dateUpdateDirIni,
      entity.dateUpdateDirEnd,
      entity.dateBachelorIni,
      entity.dateBachelorEnd,
      entity.gestionId
    )
  }

}