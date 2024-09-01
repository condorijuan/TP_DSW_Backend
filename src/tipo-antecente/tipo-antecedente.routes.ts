import { Router } from "express";
import { add, findAll, findOne, remove, update } from "./tipo-antecedente.controler.js";

export const tipoantecedenteRouters = Router();

tipoantecedenteRouters.get('/', findAll)

tipoantecedenteRouters.get('/:id', findOne);

tipoantecedenteRouters.post('/', add);

tipoantecedenteRouters.put('/:id', update);

tipoantecedenteRouters.delete('/:id', remove);