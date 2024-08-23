import {
  Entity, 
  ManyToOne, 
  Property, 
  Cascade, 
  Collection,
  Rel,
  DateTimeType, 
} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { TipoImagen } from "../tipoImagen/tipoImagen.entity.js";

@Entity()
export class Imagen extends BaseEntity{
  
/*   @Property({nullable:false}) 
  fecyhora!: string */


  @Property({ type: DateTimeType })
  createdAt? = new Date()

/*   @Property({
    type: DateTimeType,
    onUpdate: () => new Date(),
  })
  updatedAt? = new Date() */



  @Property({nullable:false}) 
  descripcion!: string

  @ManyToOne(() => TipoImagen, {nullable: false})
  tipoImagen!: Rel<TipoImagen>

  }