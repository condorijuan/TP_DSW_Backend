import { Request, Response } from "express"
import { orm } from "../shared/db/orm.js"
import { TipoAntecedente } from "./tipo-antecedente.entity.js"
import { assign } from "@mikro-orm/core"

const em = orm.em

async function findAll(req: Request, res: Response) {
    try {
        const tiposantecedente = await em.find(TipoAntecedente, {})
        res.status(200).json({message: 'finded all tipoantecedente', data: tiposantecedente})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const data = await em.findOneOrFail(TipoAntecedente, {id})
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message})
    }
}

async function add(req: Request, res: Response) {
    try {
        const tipoAntecedente = em.create(TipoAntecedente, req.body)
        await em.flush()
        res
            .status(201)
            .json({message: 'tipoAntecedente class created', data: tipoAntecedente});
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const tipoAntecedente = em.getReference(TipoAntecedente, id)
        em.assign(tipoAntecedente, req.body)
        await em.flush()
        console.log(id)
        res.status(200).json({message: 'tipoAntecedente updated'});
    } catch (error: any) {
        res.status(500).json({ message: error.message})
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const tipoAntecedente = em.getReference(TipoAntecedente, id)
        await em.removeAndFlush(tipoAntecedente)
        res.status(200).send({ message: 'tipoAntecedente deleted'})
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export {findAll, findOne, add, remove, update};