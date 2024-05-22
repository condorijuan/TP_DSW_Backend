import { Request, Response, NextFunction } from "express";
import { antecedenteRepository } from "./antecedentes.repository.js";
import { Antecedente } from "./antecedentes.entity.js";

const Repository = new antecedenteRepository();

function sanitizeProfesional(req: Request, res: Response, next: NextFunction) {
  req.body.sanitize = {
    cod_antecedente: req.body.cod_antecedente,
    tipo: req.body.tipo,
    nombre_condicion: req.body.nombre_condicion,
    descripcion: req.body.descripcion
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
  const antecedente = Repository.findOne({ id: req.params.cod_antecedente });

  if (!antecedente) {
    return res.status(404).send({ message: 'Not Found' });
  }
  res.json({ data: antecedente });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitize;

  const antecedenteInput = new Antecedente(input.cod_antecedente, input.tipo, input.nombre_condicion, input.descripcion);

  const antecedente = Repository.add(antecedenteInput);

  return res.status(201).json({ message: 'antecedente agregado', data: antecedente });
}

function update(req: Request, res: Response) {
  const input = req.body.sanitize;

  const antecedenteInput = new Antecedente(input.cod_antecedente, input.tipo, input.nombre_condicion, input.descripcion);

  const antecedente = Repository.update(antecedenteInput);

  if (!antecedente) {
    return res.status(404).send({ message: 'Not Found' });
  }

  return res.status(200).json({ message: 'antecedente actualizado', data: antecedente });
}

function remove(req: Request, res: Response) {
  const id = req.params.cod_antecedente;
  const antecedente = Repository.delete({ id });
  console.log(antecedente);
  if (!antecedente) {
    return res.status(404).send({ message: 'Not Found' });
  }
  else {
    return res.status(200).json({ message: 'antecedente eliminado', data: antecedente });
  }
}

export { sanitizeProfesional, findAll, findOne, add, remove, update };