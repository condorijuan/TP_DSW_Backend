import { Request, Response, NextFunction } from "express";
import { Paciente } from "./paciente.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em

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

async function findAll(req: Request, res: Response) {
  try {
    const pacientes = await em.find(Paciente, {})
    res.status(200).json({ message: 'finded all Paciente classes', data: pacientes })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10); // Convert the id to a number   
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const paciente = await em.findOne(Paciente, id);
    if (paciente) {
      res.status(200).json({ message: 'Paciente found', data: paciente });
    } else {
      res.status(404).json({ message: 'Paciente not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const paciente = em.create(Paciente, req.body.sanitize);
    await em.persistAndFlush(paciente);
    res.status(201).json({ message: 'Paciente created', data: paciente });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10); // Convert the id to a number   
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const paciente = await em.findOne(Paciente, id);
    if (paciente) {
      em.assign(paciente, req.body.sanitize);
      await em.persistAndFlush(paciente);
      res.status(200).json({ message: 'Paciente updated', data: paciente });
    } else {
      res.status(404).json({ message: 'Paciente not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10); // Convert the id to a number   
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const paciente = await em.findOne(Paciente, id);
    if (paciente) {
      await em.removeAndFlush(paciente);
      res.status(200).json({ message: 'Paciente deleted' });
    } else {
      res.status(404).json({ message: 'Paciente not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeProfesional, findAll, findOne, add, remove, update };