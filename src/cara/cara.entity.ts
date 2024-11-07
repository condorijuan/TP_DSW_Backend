import { Entity, OneToMany, ManyToOne, Property, Cascade, Collection, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Diente } from "../diente/diente.entity.js";

@Entity()
export class Cara extends BaseEntity {

  @Property()
  nombre!: string | null

  @Property()
  descripcion!: string | null

  @Property()
  estado!: string | null

  @ManyToOne(() => Diente, { nullable: false, onDelete: 'cascade' })
  diente!: Rel<Diente>
}