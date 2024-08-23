import { Router } from "express";
import {
    findAll,
    findOne,
    add,
    remove,
    update
} from "./imagen.controler.js";

export const imagenRouters = Router();

imagenRouters.get('/', findAll);

imagenRouters.get('/:id', findOne);

imagenRouters.post('/', add);

imagenRouters.put('/:id', update);

imagenRouters.delete('/:id', remove);