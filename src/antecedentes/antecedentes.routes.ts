import { Router } from "express";
import { findAll, findOne, add, remove, update } from "./antecedentes.controler.js";

export const antecedentesRouters = Router();

antecedentesRouters.get('/', findAll);

antecedentesRouters.get('/:id', findOne);

antecedentesRouters.post('/', add);

antecedentesRouters.put('/:id', update);

antecedentesRouters.patch('/:id', update);

antecedentesRouters.delete('/:id', remove);
