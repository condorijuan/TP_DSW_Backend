import { Entity, ManyToOne, Property, Cascade, Collection,Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { TipoAntecedente } from "../tipo-antecente/tipo-antecedente.entity.js";

@Entity()
export class Antecedente extends BaseEntity{

  @Property()
  descripcion!: string

  @ManyToOne(() => TipoAntecedente, {nullable: false})
 tipoantecedente!: Rel<TipoAntecedente> 

}