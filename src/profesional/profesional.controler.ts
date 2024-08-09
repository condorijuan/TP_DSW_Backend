import { Request, Response, NextFunction } from "express";
//import { Profesional } from "./profesional.entity.js";

function sanitizeProfesional(req: Request, res: Response, next: NextFunction) {
  req.body.sanitize = {
    id: req.body.id,
    nombre: req.body.nombre,
    apellido: req.body.apellido
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