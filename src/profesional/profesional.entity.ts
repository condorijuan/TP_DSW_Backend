import { Entity, OneToMany, Property, Cascade, Collection, OneToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Turno } from "../turno/turno.entity.js";
import { Usuario } from "../usuario/usuario.entity.js";

@Entity()
export class Profesional extends BaseEntity {

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

  @OneToMany(() => Turno, turno => turno.profesional)
  turnos = new Collection<Turno>(this)

  @Property()
  contraseña!: string

  @OneToOne(() => Usuario, usuario => usuario.profesional, { cascade: [Cascade.ALL], nullable: false })
  usuario?: Rel<Usuario>;
}