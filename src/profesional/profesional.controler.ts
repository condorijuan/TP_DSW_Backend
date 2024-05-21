import { Request, Response, NextFunction } from "express";
import { ProfesionalRepository } from "./profesional.repository.js";
import { Profesional } from "./profesional.entity.js";

const Repository = new ProfesionalRepository();

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
  res.json({ data: Repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const profesional = Repository.findOne({ id: req.params.id });

  if (!profesional) {
    return res.status(404).send({ message: 'Not Found' });
  }
  res.json({ data: profesional });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitize;

  const profesionalInput = new Profesional(input.id, input.nombre, input.apellido);

  const profesional = Repository.add(profesionalInput);

  return res.status(201).json({ message: 'profecional agregado', data: profesional });
}

function update(req: Request, res: Response) {
  const input = req.body.sanitize;

  const profesionalInput = new Profesional(input.id, input.nombre, input.apellido);

  const profesional = Repository.update(profesionalInput);

  if (!profesional) {
    return res.status(404).send({ message: 'Not Found' });
  }

  return res.status(200).json({ message: 'profesional actualizado', data: profesional });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const profesional = Repository.delete({ id });
  console.log(profesional);
  if (!profesional) {
    return res.status(404).send({ message: 'Not Found' });
  }
  else {
    return res.status(200).json({ message: 'profesional eliminado', data: profesional });
  }
}

export { sanitizeProfesional, findAll, findOne, add, remove, update };