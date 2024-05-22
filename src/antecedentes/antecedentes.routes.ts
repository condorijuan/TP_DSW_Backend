import { Router } from "express";
import { sanitizeProfesional, findAll, findOne, add, remove, update } from "./antecedentes.controler.js";

export const antecedentesRouters = Router();

antecedentesRouters.get('/', findAll);

antecedentesRouters.get('/:id', findOne);

antecedentesRouters.post('/', sanitizeProfesional, add);

antecedentesRouters.put('/:id', sanitizeProfesional, update);

antecedentesRouters.patch('/:id', sanitizeProfesional, update);

antecedentesRouters.delete('/:id', remove);
