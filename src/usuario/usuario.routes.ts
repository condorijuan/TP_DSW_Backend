import { Router } from "express";
import { sanitizeUsuario, findOne, add, remove, update, findbyEmail, findAll } from "./usuario.controler.js";
import { validarToken } from "../validarToken.js";
import { validarAdmin } from "../validarAdmin.js";

export const usuarioRouters = Router();

usuarioRouters.get('/', [validarAdmin, validarToken], findAll);

usuarioRouters.get('/:id', validarToken, findOne);

usuarioRouters.post('/', sanitizeUsuario, add);

usuarioRouters.put('/:id', [validarToken, sanitizeUsuario], update);

/* usuarioRouters.patch('/:id', sanitizeUsuario, update); */

usuarioRouters.delete('/:id', [validarToken, validarAdmin], remove);

usuarioRouters.post('/login', findbyEmail);

/* profesionalRouters.post('/login', findLogin); */