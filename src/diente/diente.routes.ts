import { Router } from "express";
import { sanitizeDiente, findAll, findOne, add, remove, update, findByOdontograma } from "./diente.controler.js";

export const dienteRouters = Router();

dienteRouters.get('/', findAll);

dienteRouters.get('/:id', findOne);

dienteRouters.post('/', add);

dienteRouters.put('/:id', sanitizeDiente, update);

dienteRouters.patch('/:id', sanitizeDiente, update);

dienteRouters.delete('/:id', remove);

dienteRouters.get('/odontograma/:odontogramaId', findByOdontograma); // Nueva ruta