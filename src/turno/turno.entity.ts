import { Entity, OneToMany, Property, Cascade, Collection, ManyToMany, ManyToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Paciente } from "../paciente/paciente.entity.js";
import { Diente } from "../diente/diente.entity.js";
import { Imagen } from "../imagenes/imagen.entity.js";
import { Profesional } from "../profesional/profesional.entity.js";

@Entity()
export class Turno extends BaseEntity {

  @Property()
  fecyhora!: string

  @Property()
  descripcion!: string

  @Property()
  precio!: number

  @Property()
  entrega!: string

  @ManyToOne(() => Paciente, { nullable: true })
  paciente!: Rel<Paciente>;

  @ManyToOne(() => Diente, { nullable: true })
  diente!: Rel<Diente>;

  @OneToMany(() => Imagen, imagen => imagen.turno, { cascade: [Cascade.ALL], nullable: true })
  imagenes = new Collection<Imagen>(this)

  @ManyToOne(() => Profesional, { nullable: true })
  profesional!: Rel<Profesional>
}