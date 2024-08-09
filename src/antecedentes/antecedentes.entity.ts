import { Entity, ManyToOne, Property, Cascade, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Antecedente extends BaseEntity{
  
  @Property()
  nombre_condicion!: string

  @Property()
  descripcion!: string
}