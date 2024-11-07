import { Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Antecedente } from "./antecedentes.entity.js";

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
      const antecedentes = await em.find(Antecedente, {},
        {populate: ['tipoantecedente']}
      )
      res.status(200).json({message: 'finded all antecedentes', data: antecedentes})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const antecedente = await em.findOneOrFail(
      Antecedente, {id},
      { populate: ['tipoantecedente']}    
    )
    res.status(200).json({ message: 'found antcedente', data: antecedente})
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const antecedente = em.create(Antecedente, req.body)
    await em.flush()
    res.status(201).json({ message: 'antecedente created', data: antecedente})
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const antecedenteToUpdate = await em.findOneOrFail(Antecedente, { id })
    em.assign(antecedenteToUpdate, req.body)
    await em.flush()
  } catch (error: any) {
    res.status(500).json({ message: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const antecedente = em.getReference(Antecedente, id)
    await em.removeAndFlush(antecedente)
  } catch (error: any) {
    res.status(500).json({ message: error.message})
  }
}

export { findAll, findOne, add, remove, update };