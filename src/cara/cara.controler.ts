import { Request, Response, NextFunction } from "express";
import { Cara } from "./cara.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em

function sanitizeCara(req: Request, res: Response, next: NextFunction) {
  req.body.sanitize = {
    id: req.body.id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    diente: req.body.diente
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
    const caras = await em.find(Cara, {})
    res.status(200).json({ message: 'finded all Cara classes', data: caras })
  } catch (error: any) {

  }
}
async function findOne(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10); // Convert the id to a number   
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const cara = await em.findOne(Cara, id);
    if (cara) {
      res.status(200).json({ message: 'Cara found', data: cara });
    } else {
      res.status(404).json({ message: 'Cara not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const cara = em.create(Cara, req.body);
    await em.persistAndFlush(cara);
    res.status(201).json({ message: 'Cara created', data: cara });
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
    const cara = await em.findOne(Cara, id);
    if (cara) {
      em.assign(cara, req.body.sanitize);
      await em.persistAndFlush(cara);
      res.status(200).json({ message: 'Cara updated', data: cara });
    } else {
      res.status(404).json({ message: 'Cara not found' });
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
    const cara = await em.findOne(Cara, id);
    if (cara) {
      await em.removeAndFlush(cara);
      res.status(200).json({ message: 'Cara deleted' });
    } else {
      res.status(404).json({ message: 'Cara not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findByDiente(req: Request, res: Response) {
  try {
    const dienteId = parseInt(req.params.dienteId, 10);
    if (isNaN(dienteId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const caras = await em.find(Cara, { diente: dienteId });
    res.status(200).json({ message: 'Cara found', data: caras });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeCara, findAll, findOne, add, remove, update, findByDiente };