import { Router } from "express";
import { sanitizeDiente, findAll, findOne, add, remove, update } from "./diente.controler.js";

export const dienteRouters = Router();

dienteRouters.get('/', findAll);

dienteRouters.get('/:id', sanitizeDiente, findOne);

dienteRouters.post('/', sanitizeDiente, add);

dienteRouters.put('/:id', sanitizeDiente, update);

dienteRouters.patch('/:id', sanitizeDiente, update);

dienteRouters.delete('/:id', remove);
