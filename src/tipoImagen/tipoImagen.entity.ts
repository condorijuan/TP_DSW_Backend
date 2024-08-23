import { Entity, OneToMany, Property, Cascade, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Imagen } from "../imagenes/imagen.entity.js";

@Entity()
export class TipoImagen extends BaseEntity{

  @Property({nullable: false, unique: true})
  nombre!: string

  @OneToMany(() => Imagen, (imagen) => imagen.tipoImagen,  {
    /* cascade: [Cascade.ALL], */
  })
  imagenes= new Collection<Imagen>(this) 
  
  }
