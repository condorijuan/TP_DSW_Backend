import {
  Entity, 
  ManyToOne, 
  Property, 
  Cascade, 
  Collection,
  Rel, 
} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { TipoImagen } from "../tipoImagen/tipoImagen.entity.js";

@Entity()
export class Imagen extends BaseEntity{
  
  @Property({nullable:false}) 
  fecyhora!: string

  @Property({nullable:false}) 
  descripcion!: string

  @ManyToOne(() => TipoImagen, {nullable: false})
  tipoImagen!: Rel<TipoImagen>

  }