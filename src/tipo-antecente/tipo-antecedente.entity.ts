import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Antecedente } from "../antecedentes/antecedentes.entity.js";

@Entity()
export class TipoAntecedente extends BaseEntity{

    @Property({nullable: false, unique: true})
    nombre!: string

    @OneToMany(() => Antecedente, (antecedente) => antecedente.tipoantecedente, {
        /* cascade: [Cascade.ALL], */
    })
    antecedentes = new Collection<Antecedente>(this)

}