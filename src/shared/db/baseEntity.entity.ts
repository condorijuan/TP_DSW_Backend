import { DateTimeType, Entity, PrimaryKey, Property } from "@mikro-orm/core";

export abstract class BaseEntity {
    @PrimaryKey()
    id?: number

/*     @Property({type: DateTimeType})
    createAt? = new Date()

    @Property({
        type: DateTimeType, 
        onUpdate: () => new Date(),        
    })
    updateAt? = new Date() */
}