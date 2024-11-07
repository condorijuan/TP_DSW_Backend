import { Request, Response, NextFunction } from "express";
import { Odontograma } from "./odontograma.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;

function sanitizeOdontograma(req: Request, res: Response, next: NextFunction) {
  req.body.sanitize = {
    id: req.body.id,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    link: req.body.link,
    paciente: req.body.paciente
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
    const odontogramas = await em.find(Odontograma, {})
    res.status(200).json({ message: 'finded all Odontograma classes', data: odontogramas })
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
    const odontograma = await em.findOne(Odontograma, id);
    if (odontograma) {
      res.status(200).json({ message: 'Odontograma found', data: odontograma });
    } else {
      res.status(404).json({ message: 'Odontograma not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const odontograma = em.create(Odontograma, req.body.sanitize);
    await em.persistAndFlush(odontograma);
    res.status(201).json({ message: 'Odontograma created', data: odontograma });
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10); // Convert the id to a number   
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const odontograma = await em.findOne(Odontograma, id);
    if (odontograma) {
      em.assign(odontograma, req.body.sanitize);
      await em.persistAndFlush(odontograma);
      res.status(200).json({ message: 'Odontograma updated', data: odontograma });
    } else {
      res.status(404).json({ message: 'Odontograma not found' });
    }
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10); // Convert the id to a number   
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const odontograma = await em.findOne(Odontograma, id);
    if (odontograma) {
      await em.remove(odontograma).flush();
      res.status(200).json({ message: 'Odontograma removed', data: odontograma });
    } else {
      res.status(404).json({ message: 'Odontograma not found' });
    }
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeOdontograma, findAll, findOne, add, remove, update };