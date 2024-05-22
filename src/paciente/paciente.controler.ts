import { Request, Response, NextFunction } from "express";
import { PacienteRepository } from "./paciente.repository.js";
import { Paciente } from "./paciente.entity.js";

const Repository = new PacienteRepository();

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
  res.json({ data: Repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const paciente = Repository.findOne({ id: req.params.dni });

  if (!paciente) {
    return res.status(404).send({ message: 'Not Found' });
  }
  res.json({ data: paciente });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitize;

  const pacienteInput = new Paciente(input.dni, input.nombre, input.apellido, input.genero, input.direccion, input.telefono, input.email);

  const paciente = Repository.add(pacienteInput);

  return res.status(201).json({ message: 'paciente agregado', data: paciente });
}

function update(req: Request, res: Response) {
  const input = req.body.sanitize;

  const pacienteInput = new Paciente(input.dni, input.nombre, input.apellido, input.genero, input.direccion, input.telefono, input.email);

  const paciente = Repository.update(pacienteInput);

  if (!paciente) {
    return res.status(404).send({ message: 'Not Found' });
  }

  return res.status(200).json({ message: 'paciente actualizado', data: paciente });
}

function remove(req: Request, res: Response) {
  const id = req.params.dni;
  const paciente = Repository.delete({ id });
  console.log(paciente);
  if (!paciente) {
    return res.status(404).send({ message: 'Not Found' });
  }
  else {
    return res.status(200).json({ message: 'paciente eliminado', data: paciente });
  }
}

export { sanitizeProfesional, findAll, findOne, add, remove, update };