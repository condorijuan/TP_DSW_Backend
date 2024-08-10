import { Router } from "express";
import { 
    findAll, 
    findOne, 
    add, 
    remove, 
    update 
} from "./tipoImagen.controler.js";

export const tipoImagenRouters = Router();

tipoImagenRouters.get('/', findAll);

tipoImagenRouters.get('/:id', findOne);

tipoImagenRouters.post('/', add);

tipoImagenRouters.put('/:id', update);

tipoImagenRouters.delete('/:id', remove);