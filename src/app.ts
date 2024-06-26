import express from 'express';
import { profesionalRouters } from './profesional/profesional.routes.js';
import { pacienteRouters } from './paciente/paciente.routes.js';
import { alergiaRouters } from './alergias/alergias.routes.js';
import { antecedentesRouters } from './antecedentes/antecedentes.routes.js';

const app = express();

app.use(express.json());

app.use('/api/profesional', profesionalRouters)

app.use('/api/paciente', pacienteRouters)

app.use('/api/alergia', alergiaRouters)

app.use('/api/antecedente', antecedentesRouters)

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});