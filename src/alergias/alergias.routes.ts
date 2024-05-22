import { Router } from "express";
import { sanitizeProfesional, findAll, findOne, add, remove, update } from "./alergias.controler.js";

export const alergiaRouters = Router();

alergiaRouters.get('/', findAll);

alergiaRouters.get('/:id', findOne);

alergiaRouters.post('/', sanitizeProfesional, add);

alergiaRouters.put('/:id', sanitizeProfesional, update);

alergiaRouters.patch('/:id', sanitizeProfesional, update);

alergiaRouters.delete('/:id', remove);
