import { Entity, OneToOne, Property, Cascade, Collection, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Profesional } from "../profesional/profesional.entity.js";

@Entity()
export class Usuario extends BaseEntity {

  @Property()
  nombre!: string

  @Property()
  apellido!: string

  @Property()
  correo!: string

  @Property()
  contrasena!: string

  @Property()
  tipo!: string

  @OneToOne(() => Profesional, profesional => profesional.usuario, { nullable: true, owner: true })
  profesional?: Rel<Profesional>;

}