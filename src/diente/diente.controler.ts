import { Request, Response, NextFunction } from "express";
import { Diente } from "./diente.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;

function sanitizeDiente(req: Request, res: Response, next: NextFunction) {
  req.body.sanitize = {
    id: req.body.id,
    codigo: req.body.codigo,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
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
    const dientes = await em.find(Diente, {})
    res.status(200).json({ message: 'finded all Diente classes', data: dientes })
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
    const diente = await em.findOne(Diente, id);
    if (diente) {
      res.status(200).json({ message: 'Diente found', data: diente });
    } else {
      res.status(404).json({ message: 'Diente not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const diente = em.create(Diente, req.body.sanitize);
    await em.persistAndFlush(diente);
    res.status(201).json({ message: 'Diente created', data: diente });
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const diente = await em.findOne(Diente, id);
    if (diente) {
      Object.assign(diente, req.body.sanitize);
      await em.persistAndFlush(diente);
      res.status(200).json({ message: 'Diente updated', data: diente });
    } else {
      res.status(404).json({ message: 'Diente not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const diente = await em.findOne(Diente, id);
    if (diente) {
      await em.removeAndFlush(diente);
      res.status(200).json({ message: 'Diente removed', data: diente });
    } else {
      res.status(404).json({ message: 'Diente not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeDiente, findAll, findOne, add, update, remove };