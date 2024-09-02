import { Entity, OneToMany, Property, Cascade, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Paciente extends BaseEntity {

  @Property()
  nombre!: string

  @Property()
  apellido!: string

  @Property()
  genero!: string

  @Property()
  direccion!: string

  @Property()
  telefono!: string

  @Property()
  email!: string

}