import { Router } from "express";
import { sanitizeProfesional, findAll, findOne, add, remove, update } from "./paciente.controler.js";

export const pacienteRouters = Router();

pacienteRouters.get('/', findAll);

pacienteRouters.get('/:id', sanitizeProfesional, findOne);

pacienteRouters.post('/', sanitizeProfesional, add);

pacienteRouters.put('/:id', sanitizeProfesional, update);

pacienteRouters.patch('/:id', sanitizeProfesional, update);

pacienteRouters.delete('/:id', remove);
