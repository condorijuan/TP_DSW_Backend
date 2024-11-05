import { Router } from "express";
import { sanitizeCara, findAll, findOne, add, remove, update, findByDiente } from "./cara.controler.js";

export const caraRouters = Router();

caraRouters.get('/', findAll);

caraRouters.get('/:id', sanitizeCara, findOne);

caraRouters.post('/', sanitizeCara, add);

caraRouters.put('/:id', sanitizeCara, update);

caraRouters.patch('/:id', sanitizeCara, update);

caraRouters.delete('/:id', remove);

caraRouters.get('/diente/:dienteId', findByDiente); // Nueva ruta