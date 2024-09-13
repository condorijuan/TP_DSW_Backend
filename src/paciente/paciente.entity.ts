import { Entity, OneToMany, Property, Cascade, Collection, OneToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Odontograma } from "../odontogramas/odontograma.entity.js";

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

  @OneToOne(() => Odontograma, odontograma => odontograma.paciente, { nullable: true, owner: true })
  odontograma?: Rel<Odontograma>;

}