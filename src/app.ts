import 'reflect-metadata';
import express from 'express';
import { profesionalRouters } from './profesional/profesional.routes.js';
import { pacienteRouters } from './paciente/paciente.routes.js';
import { antecedentesRouters } from './antecedentes/antecedentes.routes.js';
import { tipoImagenRouters } from './tipoImagen/tipoImagen.routes.js';
import { turnoRouters } from './turno/turno.routes.js';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

//luego de los middlewares base
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})
//antes de las rutas y middlewares de negocio

app.use('/api/profesional', profesionalRouters)

app.use('/api/paciente', pacienteRouters)

app.use('/api/antecedente', antecedentesRouters)

app.use('/api/tipoImagen', tipoImagenRouters)

app.use('/api/turno', turnoRouters)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not Found' });
});

await syncSchema(); //never in production

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});