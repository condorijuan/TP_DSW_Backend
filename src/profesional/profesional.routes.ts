import { Router } from "express";
import { sanitizeProfesional, findAll, findOne, add, remove, update } from "./profesional.controler.js";

export const profesionalRouters = Router();

profesionalRouters.get('/', findAll);

profesionalRouters.get('/:id', findOne);

profesionalRouters.post('/', sanitizeProfesional, add);

profesionalRouters.put('/:id', sanitizeProfesional, update);

profesionalRouters.patch('/:id', sanitizeProfesional, update);

profesionalRouters.delete('/:id', remove);
