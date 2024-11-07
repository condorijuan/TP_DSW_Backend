import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { Profesional } from "./profesional.entity.js";

const em = orm.em

function sanitizeProfesional(req: Request, res: Response, next: NextFunction) {
  req.body.sanitize = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.email,
    telefono: req.body.telefono,
    email: req.body.email,
    estado: req.body.estado
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
    const profesionales = await em.find(Profesional, {})
    res.status(200).json({ message: 'Profesionales encontrados', data: profesionales })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);  
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const profesional = await em.findOne(Profesional, id);
    if (profesional) {
      res.status(200).json({ message: 'Profesional found', data: profesional });
    } else {
      res.status(404).json({ message: 'Profesional not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const profesional = em.create(Profesional, req.body.sanitize);
    await em.persistAndFlush(profesional);
    res.status(201).json({ message: 'Profesional created', data: profesional });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const profesional = await em.findOne(Profesional, id);
    if (profesional) {
      em.assign(profesional, req.body.sanitize);
      await em.persistAndFlush(profesional);
      res.status(200).json({ message: 'Profesional updated', data: profesional });
    } else {
      res.status(404).json({ message: 'Profesional not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const profesional = await em.findOne(Profesional, id);
    if (profesional) {
      await em.removeAndFlush(profesional);
      res.status(200).json({ message: 'Profesional deleted' });
    } else {
      res.status(404).json({ message: 'Profesional not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeProfesional, findAll, findOne, add, remove, update };