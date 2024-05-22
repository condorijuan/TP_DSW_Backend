import { Request, Response, NextFunction } from "express";
import { alergiaRepository } from "./alergias.repository.js";
import { Alergia } from "./alergias.entity.js";

const Repository = new alergiaRepository();

function sanitizeProfesional(req: Request, res: Response, next: NextFunction) {
  req.body.sanitize = {
    nro_Codigo: req.body.nro_Codigo,
    alergenico: req.body.alergenico,
    reaccion: req.body.reaccion,
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
  const alergia = Repository.findOne({ id: req.params.nro_Codigo });

  if (!alergia) {
    return res.status(404).send({ message: 'Not Found' });
  }
  res.json({ data: alergia });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitize;

  const alergiaInput = new Alergia(input.nro_Codigo, input.alergenico, input.reaccion);

  const alergia = Repository.add(alergiaInput);

  return res.status(201).json({ message: 'alergia agregado', data: alergia });
}

function update(req: Request, res: Response) {
  const input = req.body.sanitize;

  const alergiaInput = new Alergia(input.nro_Codigo, input.alergenico, input.reaccion);

  const alergia = Repository.update(alergiaInput);

  if (!alergia) {
    return res.status(404).send({ message: 'Not Found' });
  }

  return res.status(200).json({ message: 'alergia actualizado', data: alergia });
}

function remove(req: Request, res: Response) {
  const id = req.params.nro_Codigo;
  const alergia = Repository.delete({ id });
  console.log(alergia);
  if (!alergia) {
    return res.status(404).send({ message: 'Not Found' });
  }
  else {
    return res.status(200).json({ message: 'alergia eliminado', data: alergia });
  }
}

export { sanitizeProfesional, findAll, findOne, add, remove, update };