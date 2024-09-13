import { Router } from "express";
import { sanitizeOdontograma, findAll, findOne, add, remove, update } from "./odontograma.controler.js";

export const odontogramaRouters = Router();

odontogramaRouters.get('/', findAll);

odontogramaRouters.get('/:id', sanitizeOdontograma, findOne);

odontogramaRouters.post('/', sanitizeOdontograma, add);

odontogramaRouters.put('/:id', sanitizeOdontograma, update);

odontogramaRouters.patch('/:id', sanitizeOdontograma, update);

odontogramaRouters.delete('/:id', remove);
