import { MikroORM } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
//import { MikroORM } from '@mikro-orm/mysql';

export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'odonto_db',
    type: 'mysql',
    clientUrl: 'mysql://root:root@localhost:3306/odonto_db',
    highlighter: new SqlHighlighter(),
    debug: true,
    schemaGenerator: {  //never in production
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    },
})

export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator()
    /* 
        await generator.dropSchema()
        await generator.createSchema()
     */
    await generator.updateSchema()
}