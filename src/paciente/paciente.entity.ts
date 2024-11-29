import { Entity, OneToMany, Property, Cascade, Collection, OneToOne, Rel, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Odontograma } from "../odontogramas/odontograma.entity.js";
import { Turno } from "../turno/turno.entity.js";

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

  @OneToOne(() => Odontograma, odontograma => odontograma.paciente, { nullable: true })
  odontograma?: Rel<Odontograma>;

  @OneToMany(() => Turno, turno => turno.paciente)
  turnos = new Collection<Turno>(this)
}