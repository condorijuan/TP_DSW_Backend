import { Router } from "express";
import { sanitizeTurno, findAll, findOne, add, remove, update, findByprofecional, findByPaciente, findByFechaHora } from "./turno.controler.js";

export const turnoRouters = Router();

turnoRouters.get('/', findAll);

turnoRouters.get('/:id', findOne);

turnoRouters.post('/', sanitizeTurno, add);

turnoRouters.put('/:id', sanitizeTurno, update);

turnoRouters.patch('/:id', sanitizeTurno, update);

turnoRouters.delete('/:id', remove);

turnoRouters.get('/profesional/:id', findByprofecional);

turnoRouters.get('/paciente/:id', findByPaciente);

turnoRouters.get('/profesional/fechahora/:fechahora', findByFechaHora);