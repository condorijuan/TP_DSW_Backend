import {Entity, OneToMany, Property, Cascade, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Odontograma extends BaseEntity{

    @Property()
    descripcion!: string

}