import { Request, Response, NextFunction } from "express";
//import { Paciente } from "./paciente.entity.js";

function sanitizeProfesional(req: Request, res: Response, next: NextFunction) {
  req.body.sanitize = {
    dni: req.body.dni,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    genero: req.body.genero,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    email: req.body.email,
  };

  Object.keys(req.body.sanitize).forEach(key => {
    if (req.body.sanitize[key] === undefined) {
      delete req.body.sanitize[key];
    }
  });

  next();
}

function findAll(req: Request, res: Response) {
  res.status(500).json({message: 'Not implemented'});
}

function findOne(req: Request, res: Response) {
  res.status(500).json({message: 'Not implemented'});
}

function add(req: Request, res: Response) {
  res.status(500).json({message: 'Not implemented'});
}

function update(req: Request, res: Response) {
  res.status(500).json({message: 'Not implemented'});
}

function remove(req: Request, res: Response) {
  res.status(500).json({message: 'Not implemented'});
}

export { sanitizeProfesional, findAll, findOne, add, remove, update };