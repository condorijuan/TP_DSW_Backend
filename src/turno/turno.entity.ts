import {Entity, OneToMany, Property, Cascade, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Turno extends BaseEntity{
  
  @Property()  
  fecyhora!: string

  @Property()
  precio!: string

  @Property()
  entrega!: string

  @Property()
  descripcion!: string

  @Property()
  pieza!: string

}