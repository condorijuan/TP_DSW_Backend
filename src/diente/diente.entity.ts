import { Entity, OneToMany, ManyToOne, Property, Cascade, Collection, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Odontograma } from "../odontogramas/odontograma.entity.js";
import { Cara } from "../cara/cara.entity.js";

@Entity()
export class Diente extends BaseEntity {

  @Property()
  codigo!: number

  @Property()
  descripcion!: string

  @Property()
  estado!: string

  @ManyToOne(() => Odontograma, { nullable: false })
  odontograma!: Rel<Odontograma>

  @OneToMany(() => Cara, cara => cara.diente, { cascade: [Cascade.ALL] })
  caras = new Collection<Cara>(this)
}