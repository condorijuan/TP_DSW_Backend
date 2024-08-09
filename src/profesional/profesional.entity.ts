import { Entity, OneToMany, Property, Cascade, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Profesional extends BaseEntity{

  @Property()  
  nombre!: string

  @Property()
  apellido!: string

  @Property()
  direccion!: string

  @Property()  
  telefono!: string

  @Property() 
  email!: string

  @Property()  
  estado!: string

}