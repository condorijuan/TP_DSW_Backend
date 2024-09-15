import { Entity, OneToMany, ManyToOne, Property, Cascade, Collection, OneToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Diente } from "../diente/diente.entity.js";
import { Paciente } from "../paciente/paciente.entity.js";

@Entity()
export class Odontograma extends BaseEntity {


    @OneToMany(() => Diente, (diente) => diente.odontograma, {
        cascade: [Cascade.ALL]
    })
    dientes = new Collection<Diente>(this)

    @Property()
    descripcion!: string

    @Property()
    fecha!: Date

    @Property()
    link!: string

    @OneToOne(() => Paciente, paciente => paciente.odontograma, { nullable: true, owner: true })
    paciente?: Rel<Paciente>;
}