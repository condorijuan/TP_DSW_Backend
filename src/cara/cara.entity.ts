import { Entity, OneToMany, ManyToOne, Property, Cascade, Collection, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Diente } from "../diente/diente.entity.js";

@Entity()
export class Cara extends BaseEntity {

  @Property()
  nombre!: number

  @Property()
  descripcion!: string

  @Property()
  estado!: string

  @ManyToOne(() => Diente, { nullable: false })
  diente!: Rel<Diente>
}